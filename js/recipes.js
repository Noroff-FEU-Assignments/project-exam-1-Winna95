const apiBase = "https://smoothie-bowl.info";
const postsBase = "/wp-json/wp/v2/posts";


const fullPostsUrl = apiBase + postsBase;
const allPostUrl = fullPostsUrl + "?per_page=100"

console.log(fullPostsUrl)

async function getposts() {
    const response = await fetch (fullPostsUrl);
    const posts = await response.json();
    return posts;
    
}
getposts().then(posts => {createPostsHtml(posts)});

async function getImgThumbnailUrl(mediaUrl) {
    const response = await fetch (mediaUrl);
    const medias = await response.json();
    return medias[0].media_details.sizes.full.source_url;
}

function createPostsHtml(posts) {
    const htmlForPostsPromises = posts.map(post => {
        const title = post.title.rendered;        
        const urlToMedia = post._links['wp:attachment'][0].href;
        return getImgThumbnailUrl(urlToMedia).then(resolvedUrl => {
            const htmlForPost = `
            <div class="all-recipes">
            <a href="/recipesDetails.html?postId=${post.id}"> <img src="${resolvedUrl}" alt="${title}" class="thumbnail-img"></a>
            <h2 class="recipes-header">${title}</h2>
            <a href="/recipesDetails.html?postId=${post.id}" class="read-more-btn">Read more
            </a>
            </div>
            `
            console.log(htmlForPost);
            return htmlForPost;
        });
        
    });

    Promise.all(htmlForPostsPromises).then(resolvedHtmlForPosts => {
        console.log(resolvedHtmlForPosts);
        const htmlForAllPosts = resolvedHtmlForPosts.join(' ');
        document.querySelector("#placeholder").innerHTML=htmlForAllPosts;
        const arrowDown = document.querySelector(".down-icon");
        arrowDown.style.display = "block"
    
        console.log(posts);
    })
}

const seeMoreBtn = document.querySelector(".fa-angles-down");
seeMoreBtn.addEventListener("click", function() {
    seeMoreBtn.style.display ="none";
    async function getposts() {
        const response = await fetch (allPostUrl);
        const allPosts = await response.json();
        return allPosts;
        
    }
    getposts().then(posts => {createPostsHtml(posts)});
    
    
})