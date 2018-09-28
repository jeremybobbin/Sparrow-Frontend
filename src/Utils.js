
class Itterable {
    constructor(itterable) {
        this.itterable = itterable;
        this.type = Utils.typeOf(itterable);
    }

    itterate(callback) {
        const { itterable } = this;
        const i = 0;
        for(let key in itterable) {
            callback(itterable[key], key,  i);
        }
    }

    filter(predicate) {
        const returnVal = Utils.getEmpty(this.type);
        
        this.itterate((v, k, i) => {

            if(predicate(v, k, i)) {
                returnVal[k] = v;
            }

        });
        
        return returnVal;

    }

    map(callback) {
        const returnVal = [];

        this.itterate((v, k, i) => {
            returnVal.push(callback(v, k, i));
        });

        return returnVal;
    }

}


class Utils {

    static empty(object) {
        return Utils.getEmpty(Utils.typeOf(object));
    }

    static getEmpty(type) {
        if(type === 'object') return {};
        if(type === 'array') return [];
        if(type === 'string') return '';
        throw `Type: '${type}' does not correspond with types`;
    }

    static forEach(object, callback) {
        const itterable = new Itterable(object);
        
        itterable.itterate(callback);
    }

    static filter(itterable, predicate) {
        const it = new Itterable(itterable);

        return it.filter(predicate);
    }

    static map(itterable, callback) {
        const it = new Itterable(itterable);

        return it.map(callback);
    }

    static removeNull(itterable) {
        return Utils.filter(itterable, v => v !== null);
    }

    static removeUndefined(itterable) {
        return Utils.filter(itterable, v => v !== undefined);
    }

    static typeOf(data) {
        if(Array.isArray(data)) {
            return 'array';
        }
        return typeof data;
    }

    // { first: 'asc', email: 'desc' }  --> ORDER BY first ASC, email DESC 
    static orderBy(object) {
        const possibleValues = ['asc', 'ASC', 'desc', 'DESC'];

        const params = Utils.map(object, (v, k) => {
            if(!possibleValues.includes(v))
                throw `The value '${v}' is not a valid parameter`;

            if(typeof k !== 'string' || typeof k !== 'string')
                throw `The column '${k}' or parameter '${v}' must be a string.`;

            return `${k} ${v.toUpperCase()}`
        });

        if(params.length) return ` ORDER BY ${params.join(', ')} `;
        return '';
    }

    // {userId: 5, name: 'Ben'} --> WHERE userId = 5 AND campaignId = 'Ben'
    static where(object) {
        object = Utils.removeUndefined(object);
        const params = Utils.map(object, (v, k) => {

            if(typeof k !== 'string')
                throw `The column '${k}'  must be a string.`;

            if(v === null) {
                return `${k} IS NULL`;
            }

            if(typeof v === 'string') v = `'${v}'`;

            return `${k} = ${v}`;
        });

        console.log(params);

        if(params.length)
            return ` WHERE ${params.join(' AND ')} `;

        return '';
    }

    // {isTracking: true, name: 'New Thing'}
    // --> (isTracking, name) VALUES (true, 'New Thing')
    static sqlValues(object) {
        const keys = [];
        const values = [];


        Utils.forEach(object, (v, k) => {
            if(k) {
                v = Utils.toSql(v);
                keys.push(k);
                values.push(v);
            }
        });

        return ` (${keys.join(', ')}) VALUES (${values.join(', ')}) `;

    }

    static sqlSet(object) {
        const setters = Utils.map(object, (v, k) => {
            if(typeof v === 'string') v = `'${v}'`;
            return `${k} = ${v}`;
        });

        return ` ${setters.join(', ')} `;
    }

    static sqlPage(pageSize, pageNumber) {
        return ` LIMIT ${pageSize} OFFSET ${pageSize * pageNumber} `;
    }

    static insertOrUpdate(object) {
        return ` ${
            Utils.sqlValues(object)
        } ON DUPLICATE KEY UPDATE ${
            Utils.sqlSet(object)
        } `;
    }

    static hasKeys(objArray, keyArray) {
        let hasKeys = true;

        if(!objArray.every(obj => obj && typeof obj === 'object')) {
            console.log('Object array has falsie values');
            return false;
        }
        objArray.forEach(obj => {
            keyArray.forEach(key => {
                if(!obj.hasOwnProperty(key)) {
                    hasKeys = false;
                }
            });
        });
        return hasKeys;
    }

    static toSql(...values) {
        return values.map(v => {
            if(v === null) return 'NULL';
            if(typeof v === 'string') return '"' + v + '"';

            return v;
        });
    }

    static parseInt(...strings) {
        return strings.map(s => parseInt(s));
    }

}
module.exports = Utils;