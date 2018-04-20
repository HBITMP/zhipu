<template>
	<div class="container">
		<p>Welcome</p>
		<router-link to='/CreatePage' class="link">开始作曲</router-link>
	</div>
</template>

<script>
	export default {
		name:'StartCreate',
	}
</script>

<style>
	.container{
		display: flex;
		flex: 1;
		flex-direction: column;
		background-image: url(../assets/startcreatebg.jpg);
		background-size: contain;
		background-position: center;
		justify-content: space-around;
	}
	.container > p {
		text-align: center;
		color: white;
		font-size: 3.5rem;
		font-weight: 500;
	} 
	.link{
		position: relative;
		height: 4rem;
		line-height: 4rem;
		border: 0;
		background: linear-gradient(to right, rgba(60,60,60,0), rgba(60,60,60,1), rgba(60,60,60,0));
		color: white;
	}
	@media screen and (orientation : landscape ) {
		/*纵向*/	
		.link{
			top: -3rem;
		}
	}
	@media screen and (orientation: portrait ) {
		.link{
			top: -10rem;
		}
	}
	
</style>