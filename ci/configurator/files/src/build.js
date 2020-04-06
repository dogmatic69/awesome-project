const libs = require('./libs');

module.exports = (config) => ({
  name: 'Continuous Integration',
  on: config.on,
  jobs: {
    ...libs.job({
      include: config.file !== false,
      name: 'File Lint',
      steps: [
        libs.checkout(),
        ...libs.fileChecks(config.file),
      ],
    }),

    ...libs.job({
      include: config.git !== false,
      name: 'Git Lint',
      steps: [
        libs.checkout(0),
        ...libs.gitChecks(config.git),
        {
          name: 'Git Leaks',
          uses: 'dogmatic69/actions/git/audit/gitleaks@master',
        },
      ],
    }),

    ...libs.job({
      include: config.trivy !== false,
      name: 'Audit Trivy',
      strategy: {
        matrix: config.trivy.matrix,
      },
      steps: [
        libs.checkout(),
        libs.run('Build', [
          'mkdir -p ./${{ matrix.image }}/output',
          'docker build -t ${{ matrix.image }} ./${{ matrix.image }}'
        ]),
        {
          name: 'Trivy Scan ${{ matrix.image }}',
          uses: 'dogmatic69/actions/docker/audit/trivy@master',
          with: {
            token: '${{ secrets.GITHUB_TOKEN }}',
            image: '${{ matrix.image }}',
            path: './${{ matrix.image }}',
          },
        },
      ]
    }),

    ...libs.job({
      include: config.docker !== false,
      name: 'Dockerfile lint',
      steps: [
        libs.checkout(),
        {
          name: 'Hadolint',
          uses: 'dogmatic69/actions/docker/lint/hadolint@master',
        },
      ],
    }),

    ...libs.collector('Docker Done', ['audit-trivy', 'dockerfile-lint']),

    ...libs.job({
      include: config.project !== false,
      name: 'Project Checks',
      strategy: {
        matrix: config.project.matrix,
      },
      steps: [
        libs.checkout(),
        libs.run('lint', 'make -C ${{ matrix.image }} lint'),
        libs.run('test', 'make -C ${{ matrix.image }} test'),
      ],
    }),

    ...libs.job({
      include: config.terraform !== false,
      name: 'Project Checks TF',
      strategy: {
        matrix: config.terraform.matrix,
      },
      steps: [
        libs.checkout(),
        ...['format', 'tflint', 'validate'].map(command => {
          return libs.run(`TF ${command}`, `make -C terraform ${command} TERRAFORM_MODULE_PATH=$(realpath ./\${{ matrix.module }}/)`)
        }),
      ],
    }),

    ...libs.collector('Project Done', ['project-checks', 'project-checks-tf']),

    ...libs.job({
      include: config.publish !== false,
      name: 'Publish',
      needs: ['file-lint', 'git-lint', 'docker-done', 'project-done'],
      strategy: {
        matrix: config.publish.matrix,
      },
      steps: [
        libs.checkout(),
        {
          name: 'GCloud Setup',
          uses: 'GoogleCloudPlatform/github-actions/setup-gcloud@master',
          with: {
            version: config.publish['gcloud-version'],
            service_account_email: '${{ secrets.GCP_SA_EMAIL }}',
            service_account_key: '${{ secrets.GCP_SA_KEY }}',
            export_default_credentials: true
          },
        },
        libs.run('Docker Login', [
          'echo "${{ secrets.GCP_SA_KEY }}" | base64 --decode |',
          'docker login -u _json_key --password-stdin https://eu.gcr.io'
        ].join("\\\n")),
        libs.run('Publish', `make -C \${{ matrix.service }} publish ENVIRONMENT=${config.publish.environment}`),
      ],
    }),
  },
});
