const apiBase = "https://smoothie-bowl.info";
const postsBase = "/wp-json/wp/v2/posts";

const postId = new URLSearchParams(document.location.search).get("postId");



const fullPostUrl = apiBase + postsBase + "/" + postId;
let imgUrlPromise;

async function getpost() {
    const response = await fetch (fullPostUrl);
    const post = await response.json();
    return post;    
}
getpost().then(post => {
    createPostHtml(post);
    const urlToMedia = post._links['wp:attachment'][0].href;
    imgUrlPromise = getImgUrl(urlToMedia);
});

async function getImgUrl(mediaUrl) {
    const response = await fetch (mediaUrl);
    const medias = await response.json();
    return medias[0].media_details.sizes.full.source_url;
}

function createPostHtml(post) {
    const title = post.title.rendered;
    const content = post.content.rendered;

    const html = `<h1>${title}</h1> ${content}`;
    document.querySelector("#recipe-placeholder").innerHTML = html;
    const spinner = document.querySelector(".spinner");
    spinner.style.display = 'none'
    
    const img = document.querySelector(".smoothie-img");
    img.addEventListener("click", function() {
        imgUrlPromise.then(imgUrl => {
        const modal = document.querySelector(".modal");
        var modalImg = document.getElementById("imgInModal");
        
        modalImg.src = imgUrl;
        modal.style.display = "block"; 
        modal.onclick = function () {
            modal.style.display = "none";
        }  
        })
    })
}