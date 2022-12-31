const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('../configs/cnStr');

const db = pgp(cn);
const schema = 'public';


module.exports = {
    all: async (tableName)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const query = pgp.as.format('SELECT * FROM $1', table);
        const rs = await db.any(query);
        return rs;
    },

    insert: async (tableName, entity)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const query =pgp.helpers.insert(entity, null, table) + 'RETURNING *'
        const rs = await db.one(query);
        return rs;
        
    },
    one: async (tableName, fieldName, fieldVal)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const query = pgp.as.format('SELECT * FROM $1   WHERE $2:alias = $3 ',[ table, fieldName, fieldVal]);
        const rs = await db.one(query);
        return rs;
        
    },
    any: async (tableName, fieldName, fieldVal)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const query = pgp.as.format('SELECT * FROM $1   WHERE $2:alias = $3 ',[ table, fieldName, fieldVal]);
        const rs = await db.any(query);
        return rs;
        
    },
    del:  async (tableName, fieldName, fieldVal)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const query = pgp.as.format('DELETE FROM $1 WHERE $2:alias = $3 ',[ table, fieldName, fieldVal]);
        const rs = await db.result(query);
        return rs;
        
    },
    updateOne:  async (tableName, fieldName, fieldVal, newFieldVal)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const query = pgp.as.format('UPDATE $1 SET $2:alias = $4 WHERE $2:alias = $3',[ table, fieldName, fieldVal, newFieldVal]);
        const rs = await db.result(query);
        return rs;
        
    },
    update:  async (tableName, fieldName, newFieldVal,checkField, check)=>{
        const table = new pgp.helpers.TableName({table: tableName, schema: schema});
        const condition = pgp.as.format(' WHERE $1:alias = $2', [checkField, check]);
        const query = pgp.helpers.update(  newFieldVal , fieldName , table) + condition;
        
        const rs = await db.result(query);
        return rs;
        
    },

};