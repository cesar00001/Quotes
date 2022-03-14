require('ts-node/register');

exports.config = {
	tests: './*/*_test.ts',
	output: './output',
	helpers: {
		REST: {
			endpoint: 'https://4c89edac-357a-42b3-94fd-e152bb28c6a8.mock.pstmn.io',
			onRequest: () => {
				//request.headers.auth = "123";
			}
		},
		JSONResponse: {}
	},
	include: {
		I: './steps_file.ts'
	},
	bootstrap: null,
	mocha: {},
	name: 'codeceptjs-rest-demo',
	plugins: {
		allure: {
			outputDir: 'report',
			enabled: true
		}
	}
};
