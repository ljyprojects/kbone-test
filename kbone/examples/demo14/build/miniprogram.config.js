module.exports = {
	origin: 'https://test.miniprogram.com',
	entry: '/test/aaa',
	router: {
		index: [
			'/test/aaa',
			'/test/bbb',
		],
	},
	redirect: {	
		notFound: 'index',	
		accessDenied: 'index',
	},
	generate: {
		autoBuildNpm: false,
	},
	app: {
		navigationBarTitleText: 'miniprogram-project',
	},
	projectConfig: {
		appid: '',
        projectname: 'kbone-demo14',
	},
	packageConfig: {
		author: 'wechat-miniprogram',
	},
}