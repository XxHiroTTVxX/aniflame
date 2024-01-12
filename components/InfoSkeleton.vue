<template>
    <div class="info-skeleton-container">
        <div class="thumbnail-skeleton">
            <Skeleton w="20rem" h="29.6rem" borderRadius="0.5rem" />
        </div>
        <div class="titles-skeleton">
            <div class="info-skeleton">

                <h1 class="english-skeleton">
                    <Skeleton w="12rem" h="2.6rem" borderRadius="0.5rem" />
                </h1>
                <h2 class="romaji-skeleton">
                    <Skeleton w="9rem" h="1.8rem" borderRadius="0.5rem" />
                </h2>
                <h3 class="native-skeleton">
                    <Skeleton w="9rem" h="1.8rem" borderRadius="0.5rem" />
                </h3>
            </div>
            <div class="button-container-skeleton">
                <div class="watch-now-button-skeleton">
                    <Skeleton w="15rem" h="3.5rem" borderRadius="0.25rem" />
                </div>
                <div class="genre-season-skeleton">
                    <div class="genres-skeleton">
                        <Skeleton v-for="n in 7" w="5rem" h="1.5rem" borderRadius="0.25rem" class="genre-skeleton" />
                    </div>
                    <div class="season-container-skeleton">
                        <div class="season-skeleton">
                            <Skeleton w="2rem" h="2rem" />
                        </div>
                        <div class="year">
                            <Skeleton w="6.6rem" h="2rem" borderRadius="0.25rem" />
                        </div>
                    </div>
                </div>
                <div class="test">
                    <div class="rating-container-skeleton">
                        <div class="rating-icon-skeleton">
                            <Skeleton w="2rem" h="2rem" borderRadius="0.25rem" />
                        </div>
                        <div class="average-rating-skeleton">
                            <Skeleton w="3rem" h="1.6rem" borderRadius="0.25rem" />
                        </div>
                    </div>

                    <div class="popularity-container-skeleton">
                        <div class="rating-icon-skeleton">
                            <Skeleton w="2rem" h="2rem" borderRadius="0.25rem" />
                        </div>
                        <div class="average-popularity-skeleton">
                            <Skeleton w="3rem" h="1.6rem" borderRadius="0.25rem" />
                        </div>

                    </div>

                </div>
                <div class="description-skeleton">
                    <Skeleton h="1em" w="100%"/>
                    <Skeleton h="1em" w="89%"/>
                    <Skeleton h="1em" w="97%"/>
                    <Skeleton h="1em" w="75%"/>
                    <Skeleton h="0.8em" w="75%"/>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.info-skeleton-container {
    margin-top: 8rem;
    margin-left: 7rem;
    display: grid;
    grid-template-columns: minmax(15rem, auto) 1fr;
    grid-gap: 16px;
    align-items: flex-start;
    position: relative;
}

.titles-skeleton {
    display: flex;
    margin-left: 1.5rem;
    flex-direction: column;
    margin-bottom: 1rem;
}

.english-skeleton {
    line-height: 1.75rem;
    margin-bottom: 0.5rem;
}

.romaji-skeleton {
    line-height: 1.75rem;
    margin-bottom: 0.2rem;
}

.native-skeleton {
    line-height: 1.75rem;
    margin-top: 0.1rem;
}

.button-container-skeleton {
    margin-top: 4rem;
}

.genre-season-skeleton {
    align-items: center;
    display: flex;
}

.genres-skeleton {
    margin-top: 1rem;
    display: inline-flex;
    gap: 0.5rem;
}

.genre-skeleton {
    border-radius: 0.25rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.1rem 0.23rem;
}

.season-container-skeleton {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    margin-left: 0.6rem;
    margin-top: 0.4rem;
}

.season-skeleton {
    margin-right: 0.5rem;
}

.rating-container-skeleton {
    margin-top: 0.4rem;
    display: flex;
    align-items: center;
    width: fit-content;
}

.rating-icon-skeleton {
    display: flex;
    margin-right: 0.4rem;
}

.average-rating-skeleton {
    margin-top: 0.3rem;
    margin-right: 0.5rem;
}

.average-popularity-skeleton {
    margin-top: 0.3rem;
    margin-right: 0.5rem;
}

.popularity-container-skeleton {
    margin-top: 0.4rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
}

.test-skeleton {
    display: flex;
    align-items: center;
}

.description-skeleton {
    position: relative;
    max-width: 70rem;
    gap:0.5rem;
    display: grid;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
}
</style>