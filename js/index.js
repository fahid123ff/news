const handaleCategory = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    

    const trimData = data.data.news_category.slice(0, 3);
    trimData.forEach((categorie) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${categorie.category_id}')" class="tab tab-active   hover:bg-sky-200 text-1xl" >${categorie.category_name}</a>
        `
        tabContainer.appendChild(div)
    });
};

const handleLoadNews = async (categorieId) =>{
    console.log(categorieId);
   const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categorieId}`);

   const data = await response.json();
//    console.log(data.data);


    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = " ";

    data.data?.forEach((news)=>{
        console.log(news);
    const div = document.createElement("div") 
    div.classList = `card w-96 bg-base-100` 
    div.innerHTML = `
    <figure><img class="w-[312px] h-[200px] rounded-lg" src="${news?.image_url}" alt="work" /></figure>
    <div class="card-body">
        <div class="flex gap-2">
            
            <h2 class="card-title ">${news.title.slice(0,40)}</h2>
            <div class="card-actions justify-end bg-pink-400       rounded-lg text-center mt-2 p-2">
             <button>${news.rating?.badge}</button>
           </div>
        </div>
        <div class="">
            <p>${news.details.slice(0,50)}</p>
            <h4>Total view: ${news.total_view ? news.total_view : "no view"}.</h4>
        </div>
        <div class="flex gap-2">
         <img class="w-12 h-10 rounded-[40px] " src="${news.author?.img
         } " alt="" />
         <div>
           <p>${news.author?.name}</p>
           <p>${news.author?.published_date}</p>
         </div> 
         <button onclick=handleModal('${news._id}') class="btn btn-secondary justify-end">Details</button>
        </div>
    </div>
    
    `
    cardContainer.appendChild(div);
    })
}



const handleModal = async(newsId) =>{
    console.log(newsId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json();
    console.log(data.data[0]);

    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement("div");
    div.innerHTML = `
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    
  <h3 class="font-bold text-lg">Hello!</h3>
  <p class="py-4">Press ESC key or click the button below to close</p>
  <div class="modal-action">
   <form method="dialog">
   <!-- if there is a button in form, it will close the modal -->
   <button class="btn">Close</button>
    </form>
  </div>
</dialog>
    `
    modalContainer.appendChild(div)
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
};




handaleCategory();
handleLoadNews("01");
