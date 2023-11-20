from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def commit_document_to_db(document):
    db.session.add(document)
    db.session.commit()

def delete_document_from_db(document):
    db.sesesion.delete(document)
    db.session.commit()
