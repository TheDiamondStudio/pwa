/* FeedEk jQuery RSS/ATOM Feed Plugin v3.2.0
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk 
* Author : Engin KIZIL */

(function ($) {
	$.fn.FeedEk = function (options) {
		var def = $.extend({
			MaxCount: 10,
			ShowDesc: true,
			ShowPubDate: true,
			DescCharacterLimit: 0,
			TitleLinkTarget: "_blank",
			DateFormat: "",
			DateFormatLang: "ru",
			Offset: 0,
			ShowAuthor: false,
			AuthorLabel: "Author:",
			Success: function () { },
			Error: function () {
				Swal.fire({
					icon: 'error',
					title: '<strong>Error!</strong>',
					html:
						'Лента новостей имеет ошибку!',
			
						showConfirmButton: false,
						showCloseButton: true,
					focusConfirm: false,
					footer: '<a href="https://youtube.com/c/Diamond1895">Создатель приложения Diamond</a>'
					})
			 }
		}, options);
		var divFeed = this;
		var init = function () {
			if (def.FeedUrl == undefined) return;
			if ($.isArray(def.FeedUrl)) {
				def.FeedUrl = def.FeedUrl.map(t => encodeURIComponent(t)).join(",,,");
			}
			else {
				def.FeedUrl = encodeURIComponent(def.FeedUrl);
			}
			getFeedData();
		}
		var getFeedData = function () {
			divFeed.empty();
			divFeed.append('<div class="text-center pt-3"><div role="status"><svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg> <span class="sr-only">Loading...</span></div></div>');
			$.ajax({
				url: "https://feed.jquery-plugins.net/load?url=" + def.FeedUrl + "&maxCount=" + def.MaxCount + "&dateCulture=" + def.DateFormatLang + "&dateFormat=" + def.DateFormat + "&offset=" + def.Offset,
				dataType: "json",
				success: function (result) {
					divFeed.empty();
					if (result.data == null) return;
					divFeed.append(generateHtml(result.data));
					def.Success(result.data);
				},
				error: function (error) {
					def.Error(error);
				}
			});
		}
		var generateHtml = function (data) {
			var s = "";
			$.each(data, function (e, itm) {
				s += '<li class="iHyrYta0Jcy0_7nMWLK7 yjGyQxv8jnYk9_MGMqLN _Qk4_E9_iLqcHsRZZ4ge PWreZZgitgAm_Nv4Noh9 pxHuWvF853ck68OLN6ef Z_eHUjNDQejPt5Nblzcx _cpMMPjFQqjJu4i0Puod JeVit_1klYopnNwu_8oy"><!--<span class="jASW_RoFnzYWYpHGcPYE kUYCkyeT8GMnhj1candf XklWzT8y98pp042XEQp4 LYMps1kO2vF8HBymW3az _gmxfZ2BpOHxa6nWwqBB cA4BPuqyV1eox6S0acvl AOldjxkjQirRFQcsh_FR YPSoR6AXtPgkmylUmcbT o56SmSceUoTbUzrFkFkA ribdR_bn_J8tEAE_XcoF">News</span>--><div class="itemTitle TMmmIBOOgaWdu7cTA33E _e063bssp_1bldcJ6kR0 _WfIfkoGCi0vvUrnNs4M marR_sCaF_d1KewmkXGX g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0"><a href="' + itm.link + '" target="' + def.TitleLinkTarget + '" >' + itm.title + '</a></div>';

				
				if (def.ShowDesc) {
					s += '<div class="itemContent _9OKVeTXzfSwD_NYO6_G XdjN1uxS_rsa3F90ox40 K1PPCJwslha8GUIvV_Cr eCx_6PNzncAD5yo7Qcic">' + getDescription(itm.description) + '</div>';
				}
				if (def.ShowAuthor) {
					s += '<div class="itemAuthor">' + def.AuthorLabel + ' ' + itm.author + '</div>';
				}
				if (def.ShowPubDate) {
					s += '<div class="itemDate MxG1ClE4KPrIvlL5_Q5x oTkHpmOXEgQRdykOe3sq K1PPCJwslha8GUIvV_Cr eCx_6PNzncAD5yo7Qcic">';
					if ($.trim(def.DateFormat).length > 0) {
						s += itm.publishDateFormatted;
					}
					else {
						s += new Date(itm.publishDate).toLocaleDateString();
					}
					s += '</div>';
				}
				s += '</li>';
			});
			return '<ul class="feedEkList yjGyQxv8jnYk9_MGMqLN zlFmyfujKXCLCPyPEOIS"><div class="OmM4wtdsNjVR2r7OSzsm veFXkDzfJN473U3ycrV8 RV8RoaI_SlEMC5CEQ3ms HV01LldvyEqRHHy0hljF jj0BrgkBpq72EXwWuBh5 sfxzXnWHolluRGSsbMHw"><div class="i0EfZzmTLElZVOble53D MSzSnYVuK0BuLFmWaksd hAFtnIdYDiO6M_67F11P NLUM9g1CxiratTbPnE1W">' + s + '</div></div></ul>';
		}
		var getDescription = function (desc) {
			if (def.DescCharacterLimit > 0 && desc.length > def.DescCharacterLimit) {
				desc = desc.substring(0, def.DescCharacterLimit) + '...';
			}
			return desc;
		}
		
		init();
	}
})(jQuery);
