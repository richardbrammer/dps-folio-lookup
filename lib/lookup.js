/** 
 *  dps-folio-lookup
 */

var http = require('http'),
	et = require('elementtree');

exports.getFolios = function (accountId, all, callback) {
	var httpOptions = {
			host: 'edge.adobe-dcfs.com',
			path: '/ddp/issueServer/issues?accountId=' + accountId
        };

    if (true === all) {
		httpOptions.path += '&targetDimension=all';
    }

    http.get(httpOptions, function (response) {
        var etree = '',
            issues = [];

        response.on('data', function (chunk) {

			etree += chunk;

        }).on('end', function () {
			var sanitizedIssues = [],
				issue = {};

			etree = et.parse(etree);
            issues = etree.findall('.//issue');

            for (var i = 0; i < issues.length; i += 1) {
				issue = issues[i].attrib;
				issue.publicationDate = issues[i].find('publicationDate').text;
				issue.magazineTitle = issues[i].find('magazineTitle').text;
				issue.number = issues[i].find('issueNumber').text;
				issue.state = issues[i].find('state').text;
				issue.description = issues[i].find('description').text;
				// issue.targetDimensions = issues[i];
				issue.folioName = issues[i].find('manifestXRef').text;

				sanitizedIssues.push(issue);
            }

            callback(sanitizedIssues);
        });
    });
}