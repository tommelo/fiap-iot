define({ "api": [
  {
    "type": "post",
    "url": "/ar-condicionado",
    "title": "Controle de temperatura do ar condicionado",
    "name": "PostArCondicionado",
    "group": "ArCondicionado",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Número inteiro representando a temperatura <br> Ex.: <br> {&quot;degrees&quot;: 20}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": "<p>Status da operação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Http/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example:",
        "content": "curl -X POST https://fiap-iot.herokuapp.com/v1/ar-condicionado -d '{\"degrees\": 20}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "ArCondicionado"
  },
  {
    "type": "post",
    "url": "/garagem",
    "title": "Abre ou fecha o portão da garagem",
    "name": "PostGaragem",
    "group": "Garagem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>'open' para abrir, 'close' para fechar. <br> Ex.: <br> {&quot;gate&quot;: &quot;open&quot;}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": "<p>Status da operação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Http/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example:",
        "content": "curl -X POST https://fiap-iot.herokuapp.com/v1/garagem -d '{\"gate\": \"open\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Garagem"
  },
  {
    "type": "post",
    "url": "/luz",
    "title": "Acende ou apaga a luz",
    "name": "PostLuz",
    "group": "Luz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>'on' para acender, 'off' para apagar. <br> Ex.: <br> {&quot;turn&quot;: &quot;on&quot;}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": "<p>Status da operação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Http/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example:",
        "content": "curl -X POST https://fiap-iot.herokuapp.com/v1/luz -d '{\"turn\": \"on\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Luz"
  },
  {
    "type": "post",
    "url": "/sensor",
    "title": "Controle de sensor",
    "name": "PostSensor",
    "group": "Sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>'on' para ligar, 'off' para desligar. <br> Ex.: <br> {&quot;turn&quot;: &quot;off&quot;}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": "<p>Status da operação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Http/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example:",
        "content": "curl -X POST https://fiap-iot.herokuapp.com/v1/sensor -d '{\"turn\": \"on\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Sensor"
  },
  {
    "type": "get",
    "url": "/temperatura",
    "title": "Verifica temperatura do ambiente",
    "name": "GetTemperatura",
    "group": "Temperatura",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": "<p>Status da operação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Http/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example:",
        "content": "curl https://fiap-iot.herokuapp.com/v1/temperatura",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Temperatura"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "_root_git_fiap_iot_docs_main_js",
    "groupTitle": "_root_git_fiap_iot_docs_main_js",
    "name": ""
  }
] });
