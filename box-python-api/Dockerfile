FROM python:alpine

WORKDIR /src

COPY requirements/requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY files/ /


ENTRYPOINT [ "python" ]

CMD [ "main.py" ]
