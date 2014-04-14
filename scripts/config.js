require.config({
		urlArgs: "bust=" +  Date.now()
});
require(["main"]);