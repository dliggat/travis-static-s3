var assert  = require('assert');
var fs      = require('fs');
var cheerio = require('cheerio');

describe('_output', function() {
  describe('index.html', function () {
    it('should contain certain elements on the page', function () {
      $ = cheerio.load(fs.readFileSync('_output/index.html'));
      assert.equal($('h1').text(), "Welcome to my Travis Static Website!");
    });
  });

  describe('404.html', function () {
    it('should contain certain elements on the page', function () {
      $ = cheerio.load(fs.readFileSync('_output/404.html'));
      assert.equal($('h1').text(), "404");
    });
  });
});
