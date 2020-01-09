FROM python:3.7-slim-buster
MAINTAINER Sarthak Jain "sarthak.jain@sjsu.edu"
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app
ENTRYPOINT [ "python3" ]
CMD [ "pso_smart.py" ]