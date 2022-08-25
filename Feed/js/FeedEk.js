/* FeedEk jQuery RSS/ATOM Feed Plugin v3.2.0
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk 
* Author : Engin KIZIL */
(function ($) {
	$.fn.FeedEk = function (options) {
		var def = $.extend({
			MaxCount: 5,
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
			divFeed.append('<img class="rounded-lg mx-auto mt-3" src="Rolling-1s-81px.gif" />');
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