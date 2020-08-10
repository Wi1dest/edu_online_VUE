import request from '@/utils/request'

export default {
    getBannerList(page,limit){
        return request({
            url: `/eduservice/banner/getBannerPage/${page}/${limit}`,
            method: 'get'
        })
    },
    saveBanner(banner){
        return request({
            url: "/eduservice/banner/saveBanner",
            method: 'post',
            data: banner
        })
    },
    deleteBanner(bannerId){
        return request({
            url: "/eduservice/banner/deleteBanner/" + bannerId,
            method: 'delete'
        })
    },
    getBannerById(bannerId){
        return request({
            url: "/eduservice/banner/getBanner/" + bannerId,
            method: 'get'
        })
    },
    updateBanner(banner){
        return request({
            url: "/eduservice/banner/updateBanner",
            method: 'put',
            data: banner
        })
    },
}