module.exports = {
    openNav: function() {
        alert('Open')
        // document.getElementsByClassName("sidenav").style.width = "300px";
        // document.getElementsByClassName("sidenav").style.boxShadow = "0px 4px 8px 0px rgba( 0, 0, 0, 0.8)";    
    },
    
    /* Set the width of the side navigation to 0 */
    closeNav : function() {
        alert('close');
        // document.getElementsByClassName("sidenav").style.width = "0";
    },

    boom : function(){
        alert('Something')
    },

    // mOver : function() {
    //     document.getElementById('something').style.backgroundColor = "#fff"
    // },
    
    // mOut: function() {
    //     document.getElementById('something').style.backgroundColor = "transparent"  ;      
    // }
}

const WOW = require('wowjs') ;

window.wow = new WOW.WOW({
    mobile: true,
    live: true,
    offset: 250,
})

window.wow.init();

