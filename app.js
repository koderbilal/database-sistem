const Methods = require("./lib/Utils.js");
const DatabaseError = require("./lib/Error.js");
const { existsSync, writeFileSync, access } = require("fs");
const { join } = require("path");
const path = require("path");
const Punctuation = new RegExp(/^[!"#%&'*,./?@^_|~-]+$/);

class db {
    /**
     * Veritabanını oluşturmak için kullanılan ayarlar nesnesi
     * @typedef {Object} Settings
     * @property {string} path Veritabanının yolu
     * @property {number} spaces Veritabanı dosyasının boşlukları
     * @property {string} seperator Kimlikler için ayırıcı
     */
    /**
     * Bir veritabanı dosyası oluşturun veya alın
     * @param {Settings} settings Ayarların nesnesi
     * @throws {DatabaseError} Hiçbir ayar yoksa veya herhangi bir ayar geçersizse
     */
     constructor(settings = {}) {
        // Ayarlar
        if (!settings)
            throw new DatabaseError("Ayarlar gerekli");
        if (typeof settings !== "object")
            throw new DatabaseError("Ayarlar bir nesne olmalıdır");
        // Yol
        if (!settings.path)
            throw new DatabaseError("Yol gerekli");
        if (typeof settings.path !== "string")
            throw new DatabaseError("Yol bir dize olmalıdır");
        if (!settings.path.endsWith(".json"))
            throw new DatabaseError("Bu yol bir json dosyasına çıktı vermez");
        // boşluklar
        if (settings.spaces && typeof settings.spaces !== "number")
            throw new DatabaseError("Veritabanı dosyasının boşlukları bir sayı olmalıdır")
        else if (!settings.spaces) settings.spaces = 0;
        // ayırıcı
        if (!settings.seperator)
            throw new DatabaseError("ayırıcı gereklidir");
        if (typeof settings.seperator !== "string")
            throw new DatabaseError("Ayırıcı bir dize olmalıdır");
        if (!Punctuation.test(settings.seperator))
            throw new DatabaseError("İzin verilmeyen ayırıcı");
        if (settings.seperator.length != 1)
            throw new DatabaseError("Ayırıcı uzunluğu 1 olmalıdır");
        /**
         * Veritabanı ayarları
         * @type {PrivateSettings}
         * @private
         */
        
        Object.defineProperty(this, "settings", {
            
            value: { ...settings, file: path.resolve(path.join(settings.path))}
        });
    
        /**
         * Metodlar
         * @type {Methods}
         * @private
         */
        Object.defineProperty(this, "methods", {
            value: new Methods({
                file: this.settings.file,
                spaces: this.settings.spaces,
                seperator: this.settings.seperator,
            })
        });
        // Checking the database file
        if (!existsSync(this.settings.file))
            writeFileSync(this.settings.file, "{}");
    
    };
    /**
     * Adds the value of an element in the database
     * @param {string} id The ID of the element
     * @param {number} value The value to be added
     * @returns {number} Result
     * @throws {DatabaseError} If the ID or value is invalid
     */
    add(id, value) {
        return this.methods.add(id, value);
    };
    /**
     * Return the all data on the database
     * @returns {object} The all data
     */
    all() {
        return this.methods.all();
    };
    /**
     * Deletes all the data in database
     * @returns {true} Indicates that it was cleared
     */
    clear() {
        return this.methods.clear();
    };
    /**
     * Deletes element from database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates that it was deleted
     * @throws {DatabaseError} If the ID is invalid
     */
    delete(id) {
        return this.methods.delete(id);
    };
    /**
     * Gets the element on the database
     * @param {string} id The ID of the element
     * @returns {*} The data
     * @throws {DatabaseError} If the ID is invalid
     */
    get(id) {
        return this.methods.get(id);
    };
    /**
     * Checks for data in the database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates presence
     * @throws {DatabaseError} If the ID is invalid
     */
    has(id) {
        return this.methods.has(id);
    };
    /**
     * Pushs the data in a array from database
     * @param {string} id The ID of the element
     * @param {*} value The pushed element
     * @returns {array} The array of the ID
     * @throws {DatabaseError} If the ID or value is invalid
     */
    push(id, value) {
        return this.methods.push(id, value);
    };
    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be setted
     * @returns {*} The value setted
     * @throws {DatabaseError} If the ID or value is invalid
     */
    set(id, value) {
        return this.methods.set(id, value);
    };
    /**
     * Subtracts the value of an element in the database
     * @param {string} id The ID of the element
     * @param {number} value The value to be subtract
     * @returns {number} Result
     * @throws {DatabaseError} If the ID or value is invalid
     */
    subtract(id, value) {
        return this.methods.subtract(id, value);
    };
    // Alternative Methods
    /**
     * Gets the element on the database
     * @param {string} id The ID of the element
     * @returns {*} The data
     * @throws {DatabaseError} If the ID is invalid
     */
    fetch(id) {
        return this.get(id);
    };
    /**
     * Deletes element from database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates that it was deleted
     * @throws {DatabaseError} If the ID is invalid
     */
    remove(id) {
        return this.delete(id);
    };
    /**
     * Deletes all the data in database
     * @returns {true} Indicates that it was cleared
     */
    reset(id) {
        return this.delete(id);
    };
};
module.exports = db;
