const apiBase = "https://smoothie-bowl.info";
const postsBase = "/wp-json/wp/v2/posts";


const fullPostsUrl = apiBase + postsBase;
const allPostUrl = fullPostsUrl + "?per_page=10"


let startIdx = 0;
let endIdx = 2
let posts = [];

async function getposts() {
    try {
        const response = await fetch (allPostUrl);
        return await response.json(); 
    } catch (error) {
        console.error("An error has occured", error);
        const errorMessageHtmlElement = document.querySelector(".error-message");
        errorMessageHtmlElement.style.display = "block";
        errorMessageHtmlElement.innerHTML = `⚠ unable to load blog posts data`;
        const spinner = document.querySelector(".spinner");
        spinner.style.display = 'none'
        return Promise.reject();
    }
}
async function getImgThumbnailUrl(mediaUrl) {
    try {
    const response = await fetch (mediaUrl);
    const medias = await response.json();
    return medias[0].media_details.sizes.full.source_url;
    } catch (error) {
        console.error("An error has occured", error);
        const errorMessageHtmlElement = document.querySelector(".error-message");
        errorMessageHtmlElement.style.display = "block";
        errorMessageHtmlElement.innerHTML = `unable to load blog posts data`;
        return Promise.reject();
    }
}
getposts().then(postsResponse => {

    let imagePromises = [];

    postsResponse.forEach(postToShow => {
        const mediaApiUrl = postToShow._links['wp:attachment'][0].href
        const imagePromise = getImgThumbnailUrl(mediaApiUrl);
        imagePromises.push(imagePromise);
    });
    
    Promise.all(imagePromises).then(imageUrls => {
        for(let i = 0; i < postsResponse.length; i++) {
            postsResponse[i].imageUrl = imageUrls[i];
        }

        posts = postsResponse;

        const spinner = document.querySelector(".spinner");
        spinner.style.display = 'none'

        showPostsForCurrentIndexes(); 
    });    
});


function showPostsForCurrentIndexes(){
   const postsToShow = posts.slice(startIdx, endIdx);
   cretePostHtml(postsToShow);
}


function cretePostHtml(postsToShow){
    const carousel = document.querySelector("#carousel-posts");
    carousel.innerHTML = "";
    let htmlForCarousel = "";
    postsToShow.forEach(postToShow => {
        htmlForCarousel = htmlForCarousel + `<div>
        <a href="/recipesDetails.html?postId=${postToShow.id}"> <img src="${postToShow.imageUrl}" alt="${postToShow.title.rendered}" class="carousel-img"></a>
        <a href="/recipesDetails.html?postId=${postToShow.id}"><p class="white-background hide">${postToShow.title.rendered}</p></a></div>`     
    })
    carousel.innerHTML = htmlForCarousel;
    
    
};

function rightArrowClicked(){
    startIdx = startIdx + 2;
    endIdx = endIdx + 2;
    //Based on query param "per_page" having been set to 10,
    // we know the size of the list, and can hardcode the end wrapping
    if(startIdx > 8){
        startIdx = 0;
        endIdx = 2
    }
    showPostsForCurrentIndexes();
}

function leftArrowClicked(){
    startIdx = startIdx - 2;
    endIdx = endIdx - 2;
    //Based on query param "per_page" having been set to 10,
    // we know the size of the list, and can hardcode the end wrapping
    if(startIdx < 0){
        startIdx = 8;
        endIdx = 10;
    }

    showPostsForCurrentIndexes();
}



const prevSlide = document.querySelector(".prev-btn");
prevSlide.addEventListener("click", leftArrowClicked);

const nextSlide = document.querySelector(".next-btn");
nextSlide.addEventListener("click", rightArrowClicked);

const recipeBtn = document.querySelector(".see-recipes-btn");
recipeBtn.addEventListener("click", function() {
    document.location.href = "recipes.html";
})
    
