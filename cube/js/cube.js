const Store = {
    // -------
    // Constants
    feedURL : 'api/api.php',

    // -------
    // Data
    state : {
        instagramFeed : [],
        instagramQuery : 'alterebro',
        instagramQueryType : null,
        instagramQueryTypes : [
            {type : 'Username', symbol: '@'},
            {type : 'Hashtag', symbol: '#'}
        ],

        cubeSides : [
            { side : 'left', label: '&#x31;', x : 0, y: 90 },
            { side : 'back', label: '&#x36;', x : 0, y: -180 },
            { side : 'top', label: '&#x33;', x : -90, y: 0 },
            { side : 'bottom', label: '&#x34;', x : 90, y: 0 },
            { side : 'front', label: '&#x35;', x : 0, y: 0 },
            { side : 'right', label: '&#x32;', x : 0, y: -90 },
        ],
        cubeSideCurrent : null,
        cubeRotate : true,
        cubeRotateId : null,
        cubeRotateMs : 1500,
        cubeRotationSwing : 25,
        cubeSize : 300,

        // Style Objects
        cubeRotation : {
            transform: 'translateZ(-3600px) rotateX(0deg) rotateY(0deg) translateY(500px)',
        },
        cubeShadow : {
            height : '0px',
            transform: 'translateY(0px) scale(1)'
        },
        cubeContainer : {
            marginTop: '0px'
        }
    },

    // -------
    // Methods
    changeSide : function(side, nonStop) {
        if ( !nonStop ) {
            // console.log(this);
            this.state.cubeRotate = false;
            this.state.cubeRotateId = null;
        }

        // Cube
        let x = side.x + Math.floor((Math.random()*(this.state.cubeRotationSwing*2)) - this.state.cubeRotationSwing);
        let y = side.y + Math.floor((Math.random()*(this.state.cubeRotationSwing*2)) - this.state.cubeRotationSwing);

        this.state.cubeRotation.transform = `translateZ(-${this.state.cubeSize/2}px) rotateX(${x}deg) rotateY(${y}deg)`;
        this.state.cubeSideCurrent = side;

        // Shadow
        let s = Math.floor(Math.random()*4)/10 + 1;
        let h = Math.floor(this.state.cubeSize/8);
        let z = Math.floor(Math.random()*(h*1.5));
        this.state.cubeShadow.transform = `translateY(${z*2}px) scale(${s})`;
        this.state.cubeShadow.height = `${h}px`;

        // Main (cubeContainer)
        this.state.cubeContainer.marginTop = `-${z*2}px`;
    },
    autoRotate : function() {
        if ( this.state.cubeRotate ) {
            let _randomSide = Math.floor(Math.random()*this.state.cubeSides.length);
            this.changeSide(this.state.cubeSides[_randomSide], true);
            this.state.cubeRotateId = window.setTimeout( () => {
                this.autoRotate()
            }, this.state.cubeRotateMs);
        }
    },
    setCubeSize : function() {
        document.documentElement.style.setProperty('--cube-size', `${this.state.cubeSize}px`);
    },
    getInstagramFeed : function(query, init = true) {

        let _xhr = new XMLHttpRequest();
            _xhr.overrideMimeType('application/json');
            _xhr.open('GET', `${Store.feedURL}?q=${query}`, true);
            _xhr.onreadystatechange = () => {
                if (_xhr.readyState === 4 && _xhr.status == "200" && _xhr.responseText != '') {

                    this.state.instagramFeed = JSON.parse(_xhr.responseText).slice(0,6);
                    if ( init) { this.autoRotate() }

                } else {

                    this.state.instagramFeed = [];
                }
            }

            _xhr.onload = function(l) { };
            _xhr.onerror = function(e) { };

        _xhr.send(null);
    }
}

// ----------
// Components
const CubeHead = {
    data : function () { return Store.state },
    name : "CubeHead",
    methods : {
        requestFeed : function() {
            let _q = this.instagramQuery.replace(/[^a-z0-9\._-]/gim,"").trim().substring(0, 30);
                _q = (this.instagramQueryType.symbol == '@') ? `@${_q}` : _q;

            Store.getInstagramFeed(_q, false);
        },
        focusize : function(e) {
            e.target.select();
        }
    },
    created() {
        Store.state.instagramQueryType = Store.state.instagramQueryTypes[0];
    }
}

const CubeInfo = {
    data : function() { return Store.state },
    name : "CubeInfo",
    methods : {},
    created() {}
}

const Cube = {
    data : function () { return Store.state },
    name : "Cube"
}

const CubeFoot = {
    data : function () { return Store.state },
    name : "CubeFoot",
    methods : {
        changeSide(side) {
            Store.changeSide(side, false);
        },
        stopRotation() {
            Store.state.cubeRotate = false;
        },
        resumeRotation() {
            Store.state.cubeRotate = true;
            Store.autoRotate();
        },
        zoomIn() {
            Store.state.cubeSize += 30;
            Store.setCubeSize();
        },
        zoomOut() {
            Store.state.cubeSize -= 30;
            Store.setCubeSize();
        },
        lockCubeRotation() {
            Store.state.cubeRotationSwing = 0;
            Store.changeSide(Store.state.cubeSideCurrent, true);
        },
        unlockCubeRotation() {
            Store.state.cubeRotationSwing = 25;
            Store.changeSide(Store.state.cubeSideCurrent, true);
        }
    }
}


// ----------
// Main App
const App = new Vue({
    el: '#app',
    components : {
        CubeHead,
        CubeInfo,
        Cube,
        CubeFoot
    },
    created : function() {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        Store.state.cubeSize = Math.floor(Math.min(w, h) / 2.5);
        Store.state.cubeSideCurrent = Store.state.cubeSides[0];
        Store.setCubeSize();
        // Store.getInstagramFeed('@alterebro');
    }
});
