const _ = require('lodash')

/**
 * @description convert an integer to a string with commas
 * @param value integer number
 */
export function numberWithCommas (number) {
  var value = 0
  if (!_.isUndefined(number)) {
    // value = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    value = _.replace(_.toString(number), /\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return value
}

/**
 * @description calculate the rate in decimal number
 * @param numerator numerator of rate
 * @param denominator denominator of rate
 * @param decimal decimal of rate
 */
export function calculateRate (numerator, denominator, decimal) {
  var rate = 0
  if (!_.isUndefined(numerator) && !_.isUndefined(denominator)) {
    rate = (numerator / denominator * 100).toFixed(decimal)
  }
  return rate
}

export function isNotUndefined (value) {
  return !_.isUndefined(value)
}
