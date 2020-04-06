const YAML = require('yamljs');

console.log(process.argv)
const config = YAML.load(`/repo/.github/workflow-templates/${process.argv[2]}.yml`);
const build = require('./build');

const json = build(config);
const output = YAML.stringify(json, 10, 2);
console.log(output);



const original = YAML.load('/repo/.github/workflows/pull-request-created.yml');



const fs = require('fs').promises;
(async() => {
  await fs.writeFile('/repo/original.yml', YAML.stringify(original, 10, 2))
  await fs.writeFile('/repo/new.yml', output)
})();


