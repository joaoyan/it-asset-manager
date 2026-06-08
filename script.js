const assetForm = document.getElementById("assetForm");
const assetsContainer = document.getElementById("assetsContainer");

let assets = JSON.parse(localStorage.getItem("assets")) || [];

function saveAssets(){
localStorage.setItem("assets",JSON.stringify(assets));
}

function renderAssets(){

assetsContainer.innerHTML="";

if(assets.length===0){
assetsContainer.innerHTML="<p>Nenhum equipamento cadastrado.</p>";
return;
}

assets.forEach(asset=>{

const card=document.createElement("div");

card.classList.add("asset-card");

card.innerHTML=`

<h3>${asset.tipo}</h3>

<p><strong>Patrimônio:</strong> ${asset.patrimonio}</p>

<p><strong>Responsável:</strong> ${asset.responsavel}</p>

<p><strong>Setor:</strong> ${asset.setor}</p>

<span class="status ${asset.status.toLowerCase().replace(" ","-")}">
${asset.status}
</span>

<br>

<button
class="delete-btn"
onclick="deleteAsset(${asset.id})"
>
Excluir
</button>

`;

assetsContainer.appendChild(card);

});

}

assetForm.addEventListener("submit",(e)=>{

e.preventDefault();

const newAsset={

id:Date.now(),

patrimonio:
document.getElementById("patrimonio").value,

tipo:
document.getElementById("tipo").value,

responsavel:
document.getElementById("responsavel").value,

setor:
document.getElementById("setor").value,

status:
document.getElementById("status").value

};

assets.push(newAsset);

saveAssets();

renderAssets();

assetForm.reset();

});

function deleteAsset(id){

assets=assets.filter(asset=>asset.id!==id);

saveAssets();

renderAssets();

}

renderAssets();
