'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-js documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' : 'data-bs-target="#xs-controllers-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' :
                                            'id="xs-controllers-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' : 'data-bs-target="#xs-injectables-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' :
                                        'id="xs-injectables-links-module-AppModule-484f788104a0af0406b748700ec9efe6622af7fbfc7975113d8382ce6c1b467372a2a66beea3163f4b26e14acd34f8e1fb2e4c325fa62a085f9579c9d2ae26ac"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' :
                                            'id="xs-controllers-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' :
                                        'id="xs-injectables-links-module-AuthModule-15b5cd7e4bea4b67dda88f255c1d44d42446693aed26d9c8475ecb80681ae26c5094dd6615da05bdda26335e9274c0237137c5fec2976fb6d8379883160970af"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' : 'data-bs-target="#xs-controllers-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' :
                                            'id="xs-controllers-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' : 'data-bs-target="#xs-injectables-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' :
                                        'id="xs-injectables-links-module-PostModule-01089143507323e0baf818f9c542747a709cfda8c6db4f78ef7789c4abfe5c30ec984a64632efb12b34a1caf482ca646f486921f5bf8347c0aaa62a753ccef43"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' :
                                            'id="xs-controllers-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' :
                                        'id="xs-injectables-links-module-UsersModule-52cfbb96c9ae34e02f3556a5a4c3c72bf9d5a196e65a2ef9408a42be03a54bf0648ec6b32717cf20d3ef2ba412fb47552428817c314b17e9c68f01ffcc4c418d"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostController.html" data-type="entity-link" >PostController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsEqualTo.html" data-type="entity-link" >IsEqualTo</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostService.html" data-type="entity-link" >PostService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});