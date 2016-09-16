/* Get from https://github.com/systemjs/systemjs/blob/96447606dc0336f359831615ec0464ffde9f7c8f/lib/paths.js
MIT License
-----------

Copyright (C) 2013-2016 Guy Bedford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
*/
function paths(paths, name) {
    // most specific (most number of slashes in path) match wins
    var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

    // check to see if we have a paths entry
    for (var p in paths) {
        if (paths.hasOwnProperty && !paths.hasOwnProperty(p))
            continue;

        // exact path match
        if (p.indexOf('*') === -1) {
            if (name == p)
                return paths[p];

            // support trailing / in paths rules
            else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && (paths[p][paths[p].length - 1] == '/' || paths[p] == '')) {
                return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? (paths[p] && '/' || '') + name.substr(p.length) : '');
            }
        }
        // wildcard path match
        else {
            var pathParts = p.split('*');
            if (pathParts.length > 2)
                throw new TypeError('Only one wildcard in a path is permitted');

            var wildcardPrefixLen = pathParts[0].length;
            if (wildcardPrefixLen >= maxWildcardPrefixLen &&
                name.substr(0, pathParts[0].length) == pathParts[0] &&
                name.substr(name.length - pathParts[1].length) == pathParts[1]) {
                maxWildcardPrefixLen = wildcardPrefixLen;
                pathMatch = p;
                wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
            }
        }
    }

    var outPath = paths[pathMatch];
    if (typeof wildcard == 'string')
        outPath = outPath.replace('*', wildcard);

    return outPath;
}
module.exports = paths;