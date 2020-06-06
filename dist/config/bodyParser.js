"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    json: {
        /* ---- limit ----
        * Controla o tamanho máximo do corpo da solicitação.
        * Se este for um número, o valor especifica o número de bytes;
        * Se for uma sequência, o valor é passado para a biblioteca de bytes para análise.
        */
        limit: '1mb',
        /* ---- strict ----
        * Quando definido como true, aceitará apenas matrizes e objetos;
        * Quando false aceitará qualquer coisa que o JSON.parse aceita.
        */
        strict: true,
        /* ---- types ----
        * É usado para determinar que tipo de mídia o middleware analisará.
        */
        types: [
            'application/json',
            'application/json-patch+json',
            'application/vnd.api+json',
            'application/csp-report'
        ]
    },
    /* Raw Parser */
    raw: {
        types: [
            'text/*'
        ]
    },
    /* Form Parser */
    form: {
        types: [
            'application/x-www-form-urlencoded'
        ]
    },
    /* Files Parser */
    files: {
        types: [
            'multipart/form-data'
        ],
        /* Max size of all the files uploaded to the server */
        maxSize: '20mb'
    },
    /* ---- urlencoded ----
    * Este objeto conterá pares de valores-chave, nos quais o valor pode ser uma cadeia de caracteres
    * ou matriz (quando extended estiver false) ou qualquer tipo (quando extended estiver true).
    */
    urlencoded: {
        extended: false
    }
};
//# sourceMappingURL=bodyParser.js.map