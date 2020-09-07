'use strict';
const FolderService = {
  getAllFolders(db) {
    return db
      .from('folders')
      .select('*');
  },
  getFolderById(db, id) {
    return db
      .from('folders')
      .select('*')
      .where('id', id)
      .first();
  },
  deleteFolder(db, id) {
    return db('folders')
      .where({ id })
      .delete();
  },
  updateFolder(db, id, newFolderFields) {
    return db('folders')
      .where({ id })
      .update(newFolderFields);
  },
  insertFolder(db, newFolder) {
    return db('folders')
      .insert(newFolder);
  }

};

module.exports = FolderService;