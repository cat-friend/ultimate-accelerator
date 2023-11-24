from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def commit_document(self, document):
    self.session.add(document)
    self.session.commit()

def delete_document(self, document):
    self.session.delete(document)
    self.session.commit()

def query(self, query, options):
    return self.session.execute(query, options).fetchall()

def add_user_to_session(self, user):
    self.session.add(user)
    self.session.commit()

db.commit_document = commit_document

db.delete_document = delete_document

db.query = query

db.add_user_to_session = add_user_to_session
