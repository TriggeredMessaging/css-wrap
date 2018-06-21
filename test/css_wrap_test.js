var
  fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  css_wrap = require('../css_wrap.js');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_wrap = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test: function(test) {
    test.expect(5);

    mkdirp('tmp');
    var options, result, actual, expected;

    // Standard test
    options = {
        selector: '.my-app',
        skip: /^\.skip-me/
    };
    result = css_wrap(path.join(__dirname, '/fixtures/styles.css'), options);

    fs.writeFileSync('tmp/styles.css', result);

    actual = fs.readFileSync('tmp/styles.css').toString();
    expected = fs.readFileSync(path.join(__dirname, '/expected/styles.css')).toString();

    test.strictEqual(actual, expected, 'CSS Files should match (standard)');
    
    // Sibling only
    options = {
      selector: '.my-app',
      skip: /^\.skip-me/,
      sibling: true,
      parent: false,
    };
    result = css_wrap(path.join(__dirname, '/fixtures/styles.css'), options);

    fs.writeFileSync('tmp/styles-sibling.css', result);

    actual = fs.readFileSync('tmp/styles-sibling.css').toString();
    expected = fs.readFileSync(path.join(__dirname, '/expected/styles-sibling.css')).toString();

    test.strictEqual(actual, expected, 'CSS Files should match (sibling only)');

    // Parent only
    options = {
      selector: '.my-app',
      skip: /^\.skip-me/,
      sibling: false,
      parent: true,
    };
    result = css_wrap(path.join(__dirname, '/fixtures/styles.css'), options);

    fs.writeFileSync('tmp/styles-parent.css', result);

    actual = fs.readFileSync('tmp/styles-parent.css').toString();
    expected = fs.readFileSync(path.join(__dirname, '/expected/styles-parent.css')).toString();

    test.strictEqual(actual, expected, 'CSS Files should match (parent only)');
    
    // Both parent and sibling
    options = {
      selector: '.my-app',
      skip: /^\.skip-me/,
      sibling: true,
      parent: true,
    };
    result = css_wrap(path.join(__dirname, '/fixtures/styles.css'), options);

    fs.writeFileSync('tmp/styles-parent-and-sibling.css', result);

    actual = fs.readFileSync('tmp/styles-parent-and-sibling.css').toString();
    expected = fs.readFileSync(path.join(__dirname, '/expected/styles-parent-and-sibling.css')).toString();

    test.strictEqual(actual, expected, 'CSS Files should match (parent and sibling)');
    
    // Neither parent and sibling
    options = {
      selector: '.my-app',
      skip: /^\.skip-me/,
      sibling: false,
      parent: false,
    };
    result = css_wrap(path.join(__dirname, '/fixtures/styles.css'), options);

    fs.writeFileSync('tmp/styles-neither.css', result);

    actual = fs.readFileSync('tmp/styles-neither.css').toString();
    expected = fs.readFileSync(path.join(__dirname, '/expected/styles-neither.css')).toString();

    test.strictEqual(actual, expected, 'CSS Files should match (neither)');
    
    test.done();
  }
};
