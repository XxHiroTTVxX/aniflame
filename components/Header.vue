<template>

<nav class="main-nav">
	<div class="search-input">
		<form id="search">
			<input
				type="text"
				placeholder="Search up top animes"
				id="searchText"
				name="searchKeyword"
			/>
			<i class="icon"><IconSearch :size="18" color="var(--text-color)" /></i>
		</form>
	</div>
	<ul class="nav">
		<li><a href="/">Home</a></li>
		<li><a href="/explore">Explore</a></li>
		<li><a href="/popular">Popular</a></li> <!-- need to do -->
		<li><a href="/donate">Donate</a></li> <!-- need to do -->
		<li />
		<div class="notifications">
			<i class="notifications-icon">
			<IconBellRing
			color="var(--text-color)"
			:size="20"
			/>
		</i>
		</div>
		<div class="profile">
		<img src="/assets/images/pfp-placeholder.jpg" class="profile-img"/>
		</div>
	</ul>
</nav>


</template>

<style scoped>
@import "/assets/css/header.css";
</style>
