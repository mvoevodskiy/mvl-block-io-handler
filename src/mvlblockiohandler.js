const MVLoaderBase = require('mvloader/src/mvloaderbase');
const BlockIo = require('block_io');

class MVLBlockIOHandler extends MVLoaderBase {
    constructor (...config) {
        const defaults = {
            apiKey: '',
            secretPin: '',
            version: 2,
        };
        super(defaults, ...config);
    }

    async init() {
        super.init();

        const {apiKey, secretPin, version} = this.config;
        this.blockIo = new BlockIo(apiKey, secretPin, version);
    }

    async withdraw(amount, address) {
        return new Promise((resolve, reject) => {
            this.blockIo.withdraw({'amounts': amount, 'to_addresses': address}, function(err, res) {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}

module.exports = MVLBlockIOHandler;
