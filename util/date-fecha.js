/**
 * Created by litian on 16/6/22.
 */

var fecha = require('fecha');

fecha.masks = {
    'default': 'YYYY-MM-DD HH:mm:ss',
    shortDate: 'YYYY-MM-DD',
    mediumDate: 'MMM D, YYYY',
    longDate: 'MMMM D, YYYY',
    fullDate: 'dddd, MMMM D, YYYY',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
};

module.exports = fecha;
