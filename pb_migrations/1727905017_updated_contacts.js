/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d1sj166tr4bydvt")

  collection.listRule = "@request.auth.id = userid"
  collection.viewRule = "@request.auth.id = userid"
  collection.createRule = "@request.auth.id = userid"
  collection.updateRule = "@request.auth.id = userid"
  collection.deleteRule = "@request.auth.id = userid"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d1sj166tr4bydvt")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
