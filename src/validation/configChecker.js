import * as config from "../config"

export function IpCheck () {
    if (typeof config.Ip === 'undefined'){
        alert('Config error, Ip is undefined')
    }
    else if (typeof(config.Ip) !== 'function'){
        alert('Config error, Ip func is not func')
    } 
    else if (typeof(config.Ip()) !== 'string'){
        alert('Config error, Ip return is not string')
    }
}