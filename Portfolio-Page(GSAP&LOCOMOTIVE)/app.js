let locomotiveWithScroll = function() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

locomotiveWithScroll();

let loader = function() {
    let val = document.querySelector("#load");
    console.log(val);
    let count = 0;
    let t = setInterval(() => {
        if(count<100){
            val.innerHTML = `${count++}%`;
            console.log(val);
        } else{
            val.innerHTML = `100%`;
            clearInterval(t);
            console.log("interval cleared");
        }
        
    },25);
}

loader();

let gsapAnimation = function() {
    let tl = gsap.timeline();

tl.to("#loader", {
    duration:3,
})

tl.to("#loader", {
    opacity:0,
    display:"none"
})

tl.from("#main", {
    y: 5000,
    duration:1.5,
    opacity:0,
    scrub:5
})

tl.from("#main #page1 header h1", {
    y: -50,
    duration:0.5,
    delay:0.1,
    opacity:0,
    stagger:0.2,
    scrub:5,
    pin:true
})

tl.from("#main #page1 #container h1", {
    left: "-50%",
    duration:1,
    opacity:0,
    stagger:1,
    scrub:5,
})

tl.from("#main #page1 #container #right", {
    left: "120%",
    delay:-1.5,
    duration:1,
    opacity:0,
    stagger:1
})

tl.from("#main #page1 #page1-bottom h3", {
    duration:0.5,
    opacity:0,
})


tl.from("#main #page1 #container #img1", {
    x:100,
    duration:0.8,
    delay:0.2,
    opacity:0,
    rotate:45,
    scrub:1
})

tl.from("#main #page1 #container #img2", {
    x:100,
    duration:0.8,
    opacity:0,
    rotate:60,
    scrub:1
})

tl.from("#main #page1 #container #img3", {
    x:100,
    duration:0.8,
    opacity:0,
    rotate:75,
    scrub:1
})
}

gsapAnimation();

let gsapScrollAnimation = function() {
    gsap.to("#main #page2 h1", {
        transform:"translateX(-110%)",
        scrollTrigger:{
            trigger:"#page2 h1",
            scroller:"#main",
            // markers:true,
            start:"top 0%",
            end:"top -150%",
            scrub:1,
            pin:true
        }
    })
    
    // gsap.to("#main #page3 video", {
    //     width:"100%",
    //     scrollTrigger:{
    //         trigger:"#page3",
    //         scroller:"#main",
    //         markers:true,
    //         start:"top 0",
    //         end:"top -100%",
    //         scrub:5,
    //         pin:true
    //     }
    // })
    
    gsap.to("#main #page5 img", {
        width:"100%",
        scrollTrigger:{
            trigger:"#page5",
            scroller:"#main",
            // markers:true,
            start:"top 0",
            end:"top -100%",
            scrub:5,
            pin:true
        }
    })
}

gsapScrollAnimation();

let coolText = function() {
    let allh1 = document.querySelectorAll("#h1");

allh1.forEach(function(elem) {
    let h1TEXT = elem.textContent;
    let splittedTEXT = h1TEXT.split("");
    let clutter = "";

    splittedTEXT.forEach((e) => {
        clutter += `<span>${e}</span>`
    });

    elem.innerHTML = clutter;
})

if(screen.width < 450 ) {
    gsap.to("#page4 h1 span", {
        color:"#FBFBFB",
        stagger:0.1,
        scrollTrigger:{
            trigger:"#page4 h1 span",
            scroller:"#main",
            // markers:true,
            start:"top 100%",
            end:"top 0%",
            scrub:2
        }
    })
} else {
    gsap.to("#page4 h1 span", {
        color:"#FBFBFB",
        stagger:0.1,
        scrollTrigger:{
            trigger:"#page4 h1 span",
            scroller:"#main",
            // markers:true,
            start:"top 60%",
            end:"top -60%",
            scrub:2
        }
    })
}


}

coolText();
