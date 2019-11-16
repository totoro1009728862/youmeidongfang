<template>
    <div ref="cropperPage" class="cropper-page">
        <img ref="imgWrap" alt class="cropper-img" :style="imageStyle" />
        <div
            ref="cropBox"
            class="cropper-box"
            :style="{ 'margin-top': imageStyle.top }"
            @touchstart.prevent="touchStart"
            @touchmove.prevent="touchMove"
            @touchend.prevent="touchEnd"
        ></div>
        <div class="crop-bottom">
            <div class="item">
                <input ref="file" class="input-upload" type="file" accept="image/*" @change="readImage" />
                <span class="input-upload-text">上传图片</span>
            </div>
            <div class="item" @click="confirm">保存图片</div>
        </div>
    </div>
</template>

<script>
import EXIF from './index.js'
const getDinstance = function(point0, point1) {
    return Math.sqrt(Math.pow(point0.pageY - point1.pageY, 2) + Math.pow(point0.pageX - point1.pageX, 2))
}
export default {
    name: 'ImageCrop',
    props: {
        cropperConfig: {
            type: Object,
            default() {
                return {
                    width: 1,
                    height: 1,
                    quality: 0.7,
                    maxWidth: 640
                }
            }
        },
        nowImg: {
            type: String,
            default: 'http://qiniu.hxtrip.com/integration/image/user/649/b5102b041c8f4a169a79b2a8549e00b3.jpg'
        }
    },
    data() {
        return {
            coverHeight: 375,
            imgInitTop: 0,
            amplitude: 0,
            imageState: {
                left: 0,
                top: 0,
                scale: 1,
                width: 0,
                height: 0,
                originX: 0,
                originY: 0
            },
            distance: 0,
            imageStyle: {
                top: '20px',
                transform: 'translate3d(0px, 0px, 0px) scale(1)',
                transformOrigin: 'left top'
            },
            cropBoxRect: {},
            touchPos: {
                x: 0,
                y: 0
            },
            isShow: false,
            minScale: 0,
            info: '',
            orientation: '',
            filesItem: ''
        }
    },
    watch: {
        imageState: {
            handler(val) {
                this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px) scale(' + val.scale + ')'
            },
            deep: true
        }
    },
    mounted() {
        this.$refs.imgWrap.src = this.nowImg
        this.$refs.imgWrap.onload = () => {
            this.initCropper()
        }
    },
    methods: {
        readImage($event) {
            const self = this
            let files = $event.target.files || $event.dataTransfer.files
            if (!files.length) return
            let file = files[0]
            this.filesItem = files[0]
            let reader = new window.FileReader()
            reader.onload = () => {
                EXIF.getData(file, function() {
                    let orientation = EXIF.getTag(this, 'Orientation')
                    if (!orientation) orientation = 1
                    self.orientation = orientation
                    self.$refs.imgWrap.onload = () => {
                        self.initCropper()
                    }
                    self.$refs.imgWrap.src = reader.result
                    $event.target.value = null
                })
            }
            reader.readAsDataURL(file)
        },
        initCropper() {
            this.isShow = true // 显示裁剪界面
            this.$nextTick(() => {
                let cropperPage = this.$refs.cropperPage
                let pageWidth = cropperPage.clientWidth
                // let pageHeight = cropperPage.clientHeight
                let cropBox = this.$refs.cropBox
                let cropBoxWidth = cropBox.clientWidth
                let cropBoxHeight = Math.floor((cropBoxWidth * +this.cropperConfig.height) / +this.cropperConfig.width)
                this.$refs.cropBox.style.height = cropBoxHeight + 'px'
                this.coverHeight = 20
                let cropBoxTop = this.coverHeight
                this.imageState.left = 0
                this.imageState.top = 0
                this.imageStyle.top = cropBoxTop + 'px'
                this.cropBoxRect = {
                    left: 0,
                    top: cropBoxTop,
                    width: pageWidth,
                    height: cropBoxHeight
                }
                let img = this.$refs.imgWrap
                var width = (this.imageState.width = img.naturalWidth)
                var height = (this.imageState.height = img.naturalHeight)
                // 计算imageState
                if (width > height) {
                    this.minScale = this.imageState.scale = this.cropBoxRect.height / height
                    this.imageState.left = (width * this.imageState.scale - this.cropBoxRect.width) / 2
                } else {
                    this.minScale = this.imageState.scale = this.cropBoxRect.width / width
                    this.imageState.top = (height * this.imageState.scale - this.cropBoxRect.height) / 2
                }
            })
        },
        confirm() {
            if (!this.$refs.imgWrap.src) {
                this.$Toast('请先上传图片')
                return
            }
            // let self = this
            let imageState = this.imageState
            let cropBoxRect = this.cropBoxRect
            // 导出图片的最大宽度
            let maxWidth = this.cropperConfig.maxWidth
            let scale2 = maxWidth / cropBoxRect.width
            let scale = imageState.scale * scale2
            let width = cropBoxRect.width * scale2
            let height = cropBoxRect.height * scale2
            let left = imageState.left * scale2
            let top = imageState.top * scale2
            let image = this.$refs.imgWrap
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let orientation = this.orientation
            switch (orientation) {
                case 1:
                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(image, left / scale, top / scale, width / scale, height / scale, 0, 0, width, height)
                    break
                case 6:
                    canvas.width = height
                    canvas.height = width
                    ctx.rotate((90 * Math.PI) / 180)
                    ctx.drawImage(image, left / scale, top / scale, width / scale, height / scale, 0, -height, width, height)
                    break
                case 8:
                    canvas.width = height
                    canvas.height = width
                    ctx.rotate((-90 * Math.PI) / 180)
                    ctx.drawImage(image, left / scale, top / scale, width / scale, height / scale, -width, 0, width, height)
                    break
                case 3:
                    canvas.width = width
                    canvas.height = height
                    ctx.rotate((180 * Math.PI) / 180)
                    ctx.drawImage(image, left / scale, top / scale, width / scale, height / scale, -width, -height, width, height)
                    break
            }
            let dataUrl = canvas.toDataURL('image/jpeg', this.cropperConfig.quality)
            if (this.$refs.imgWrap.src && this.$refs.imgWrap.src !== this.nowImg) {
                this.$emit('onClick', dataUrl)
            } else {
                this.$router.replace({ name: 'AccountInfo' })
            }
        },
        getFocalPoint(point0, point1) {
            return {
                x: (point0.pageX + point1.pageX) / 2,
                y: (point0.pageY + point1.pageY) / 2
            }
        },
        touchStart(event) {
            var fingerCount = event.touches.length
            if (fingerCount) {
                // 记录触摸初始位置
                let touchEvent = event.touches[0]
                this.touchPos = {
                    x: touchEvent.clientX,
                    y: touchEvent.clientY
                }
            }
            if (fingerCount >= 2) {
                // 获取两点距离、中点位置；两点距离old/new=放大倍数；中点位置，缩放中心；
                let point0 = event.touches[0]
                let point1 = event.touches[1]
                this.distance = getDinstance(point0, point1)
                this.touchPos = this.getFocalPoint(point0, point1)
                // 设置缩放倍数，
            }
        },
        touchMove(event) {
            // 根据触摸点位移，移动图片，重置触摸点位置
            var fingerCount = event.touches.length
            var touchEvent = event.touches[0]
            if (fingerCount === 1) {
                let distX = touchEvent.pageX - this.touchPos.x
                let distY = touchEvent.pageY - this.touchPos.y
                let newX = this.imageState.left - distX
                let newY = this.imageState.top - distY
                let scale = this.imageState.scale
                // alert(scale)
                let maxX = this.imageState.width * scale - this.cropBoxRect.width
                let maxY = this.imageState.height * scale - this.cropBoxRect.height
                this.imageState.left = newX < 0 ? 0 : newX > maxX ? maxX : newX
                this.imageState.top = newY < 0 ? 0 : newY > maxY ? maxY : newY
                this.touchPos.x = touchEvent.pageX
                this.touchPos.y = touchEvent.pageY
            } else if (fingerCount > 1) {
                let point0 = event.touches[0]
                let point1 = event.touches[1]
                let distance = getDinstance(point0, point1)
                let zoom = distance / this.distance
                let scale = zoom * this.imageState.scale
                let maxX = this.imageState.width * scale - this.cropBoxRect.width
                let maxY = this.imageState.height * scale - this.cropBoxRect.height
                let touchPos = this.getFocalPoint(point0, point1)
                let newX = zoom * (this.imageState.left + touchPos.x) - touchPos.x
                let newY = zoom * (this.imageState.top - this.imgInitTop + touchPos.y) - touchPos.y + this.imgInitTop
                // 限制缩放
                // 图片新位置:由中点位置确认;(新位置到中点)/(旧位置到中点)=(new scale)/(old scale)
                // newLeft - touchPos.x = (distance / this.distance) * (oldLetf - touchPos.x)
                // oldLeft = 0 - this.imageState.left
                // oldTop = imgInitTop - this.imageState.top
                this.distance = distance
                if (scale < this.minScale) {
                    this.imageState.scale = this.minScale
                } else {
                    this.imageState.scale = scale
                    this.imageState.left = newX < 0 ? 0 : newX > maxX ? maxX : newX
                    this.imageState.top = newY < 0 ? 0 : newY > maxY ? maxY : newY
                }
                this.touchPos = touchPos
            }
        },
        touchEnd() {}
    }
}
</script>
<style lang="less" scoped>
.input-upload {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
}

.input-upload-text {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.cropper-page {
    width: 100vw;
    max-width: 750px;
    margin: 0 auto;
    height: calc(100vh - 100px);
    background-color: #222222;
    overflow: hidden;
    position: fixed;
    z-index: 10;
    top: 100px;
    // left: 0;
}
.cover {
    color: #fff;
    font-size: 0.4rem;
    background-color: rgba(0, 0, 0, 0.2);
}
.cropper-box {
    border: 4px dashed #fff;
    margin-top: 20px;
    height: 100vw;
}
.cropper-img {
    position: absolute;
    z-index: -1;
}
.crop-bottom {
    position: fixed;
    // left: 0;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    height: 200px;
    font-size: 32px;
    background-color: #fff;
    z-index: 100;
    .item {
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-bottom: 2px solid #e5e5e5;
        position: relative;
        font-weight: 500;
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>
