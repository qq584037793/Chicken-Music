// https://v3.vuejs.org/guide/custom-directive.html#custom-directives
import Loading from './loading'
import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive'

const loadingDirective = createLoadingLikeDirective(Loading)

export default loadingDirective
