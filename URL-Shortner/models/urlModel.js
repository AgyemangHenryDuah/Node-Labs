// /models/urlModel.js

const urlMappings = new Map()

// Save a new mapping
function saveMapping(shortcode, longURL) {
  urlMappings.set(shortcode, longURL)
}

// Get a mapping by shortcode
function getMapping(shortcode) {
  return urlMappings.get(shortcode)
}

// Get all mappings (return as an array of arrays)
function getAllMappings() {
  return Array.from(urlMappings.entries()) // Convert Map to array of [key, value] pairs
}

module.exports = { saveMapping, getMapping, getAllMappings }
