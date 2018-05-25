<template>  
  <div id="container">   
      <canvas id="the-canvas"></canvas>  

  </div>  
</template>  
<script>  
import PDFJS from 'pdfjs-dist'  
  
export default {  
	data () {  
		return {   

		}  
	},
  	mounted(){
		this.showPDF('../../../static/pdf.pdf');
		console.log(this);
	},  
	methods: {  
		showPDF (url) {  
			console.log("url: " + url);
			PDFJS.getDocument(url).then( pdf => {
				console.log(pdf);
				pdf.getPage(1).then(function(page) {
					console.log(page);
					var scale = 1.5;
					var viewport = page.getViewport(scale);

					var canvas = document.getElementById('the-canvas');
					var context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					var renderContext = {
					canvasContext: context,
					viewport: viewport
					};
					page.render(renderContext);
				});
			});
		}
  	}  
}  
</script>  
  
<style scoped>  
#container {  
  background-color: rgba(0,0,0,0.75);  
  position:fixed;  
  width: 100%;  
  height: 100%;  
  top: 0;  
  left: 0;  
  text-align: center;  
  padding: 5px;  
}  
  
.pdf-page {  
  
}  
  
.foot {  
  position: fixed;  
  transform: translate(-50%,0);  
  left: 50%;  
}  
</style>  