import { defineStore } from "pinia";

interface MemorizeImage {
    id: number,
    title: string,
    url: string,
    uuid: string,
    active: boolean,
    keep: boolean,
}

export const useMemorizeStore = defineStore('memorize', {
    state: () => ({
        easy: 5,
        medium: 10,
        hard: 15,
        hits: 0,
        misses: 0,
        gameLevel: 1,
        easyMaxScore: localStorage.getItem('easy') || "0",
        mediumMaxScore: localStorage.getItem('medium') || "0",
        hardMaxScore: localStorage.getItem('hard') || "0",
        playerName: localStorage.getItem('user') || '',
        openCongratsModal: false,
        openRegisterModal: false,
        images: [] as MemorizeImage[],
        firstSelection: null as MemorizeImage | null,
        secondSelection: null as MemorizeImage | null,
    }),
    getters: {
        getHits: (state) => state.hits,
        getMisses: (state) => state.misses,
        getPlayerName: (state) => state.playerName,
        getEasyMaxScore: (state) => state.easyMaxScore,
        getMediumMaxScore: (state) => state.mediumMaxScore,
        getHardMaxScore: (state) => state.hardMaxScore,
        getGameLevelName: (state) => {
            const level = state.gameLevel || 1
            const levelName: Record<number, string> = {
                1: 'Fácil',
                2: 'Medio',
                3: 'Difícil',
            }
            const levelDefault = 'Sin Definir'
            return levelName[level] || levelDefault;
        },
        getGameLevelColor: (state) => {
            let level = state.gameLevel || 1
            let levelColor: Record<number, string> = {
                1: 'text-green-500',
                2: 'text-yellow-500',
                3: 'text-red-500',
            }
            const levelDefault = 'text-slate-400'
            return levelColor[level] || levelDefault;
        },
        getCongratsModal: (state) => state.openCongratsModal,
        getRegisterModal: (state) => state.openRegisterModal,
        getDoubleRandomizedImages: (state) => state.images,
        openCard: (state) => (uuid: string, id: number) => {
            const image = state.images.find(image => uuid === image.uuid && id === image.id);
            if (image) image.active = !image.active;
        },
        setFirstSelection: (state) => (selection: MemorizeImage) => {
            state.firstSelection = selection;
        },
        setSecondSelection: (state) => (selection: MemorizeImage) => {
            state.secondSelection = selection;
        }
    },
    actions: {
        async getImages(level: number) {
            try {
                let ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
                let gameLevel = level === 1 ? this.easy : level === 2 ? this.medium : this.hard;
                this.gameLevel = level;

                if(!ENDPOINT) throw new Error(
                    'Sin Endpoint Configurado'
                );

                const response = await fetch(`${ENDPOINT}?per_page=20`);
                const data = await response.json();

                let counter = 1;
                let selectedImages = data.entries.slice(0, gameLevel);
                let duplicatedImages = [...selectedImages, ...selectedImages];
                let orderImages = duplicatedImages.map((entry: any) => ({
                    id: counter++,
                    title: entry.fields.image.title || 'Sin Título',
                    url: entry.fields.image.url,
                    uuid: entry.fields.image.uuid,
                    active: false,
                    keep: false,
                }));
                let currentIndex = selectedImages.length;
                while (currentIndex != 0) {
                    let randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    [orderImages[currentIndex], orderImages[randomIndex]] = [orderImages[randomIndex], orderImages[currentIndex]];
                }
                this.images = orderImages;
            } catch (error) {
                console.log("Error al Cargar Imágenes: ", error);
            }
        },
        addHit() { this.hits++ },
        addMiss() { this.misses++ },
        checkAllImagesKeep() {
            let allImagesKeep = true;
            this.images.forEach(image => {
                if (image.keep === false) {
                    allImagesKeep = false;
                }
                return allImagesKeep;
            })
            allImagesKeep ? this.openCongratsModal = true : false;
        },
        checkMatchSelection() {
            let firstSelection = this.firstSelection;
            let secondSelection = this.secondSelection;
            if (firstSelection && secondSelection) {
                this.resetSelection();
                setTimeout(() => {
                    if (firstSelection.uuid === secondSelection.uuid) {
                        firstSelection.keep = true;
                        secondSelection.keep = true;
                        this.addHit()
                        this.checkAllImagesKeep();
                        this.savePlayerScore();
                    } else {
                        firstSelection.active = false;
                        secondSelection.active = false;
                        this.addMiss()
                    }
                }, 500)
            }
        },
        savePlayerScore() {
            let totalMovements = this.hits + this.misses;
            if (this.gameLevel === 1) {
                if (totalMovements < parseInt(this.easyMaxScore)) {
                    console.log(totalMovements)
                    localStorage.setItem('easy', totalMovements.toString());
                }
            } else if (this.gameLevel === 2) {
                if (totalMovements < parseInt(this.mediumMaxScore)) {
                    console.log(totalMovements)
                    localStorage.setItem('medium', totalMovements.toString());
                }
            } else if (this.gameLevel === 3) {
                if (totalMovements < parseInt(this.hardMaxScore)) {
                    console.log(totalMovements)
                    localStorage.setItem('hard', totalMovements.toString());
                }
            }
        },
        resetSelection() {
            this.firstSelection = null;
            this.secondSelection = null;
        },
        resetGame() {
            this.hits = 0;
            this.misses = 0;
            this.images = [];
            this.gameLevel = 1;
            this.firstSelection = null;
            this.secondSelection = null;
            this.openCongratsModal = false;
            location.reload();
        }
    },
})