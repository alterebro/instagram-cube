# [InstaCube](https://instacube.moro.es) (instagram-cube)

> Your Instagram feed in a cube!

![InstaCube](cube/images/instagram-cube.jpg "InstaCube")

---


### Install

```sh
$ composer install
$ npm install
```


### Build

```sh
$ gulp create
```

This will create the following files :

	index.html
	/cube/css/cube.min.css
	/cube/js/axios.min.js
	/cube/js/vue.min.js
	/cube/js/cube.min.js


### Deploy

Open `upload-sample.sh`, set the variables to your own values, then rename it to `upload.sh` and give the file proper permissions (`chmod +x sync.sh`)

```sh
$ sh upload.sh test # dry-run flagged
$ sh upload.sh sync # rsyncs local copy to server
```

---

*Jorge Moreno &mdash; [@alterebro](https://twitter.com/alterebro)*
