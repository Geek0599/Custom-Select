//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains("_slide")) {
	  target.classList.add("_slide");
	  target.style.transitionProperty = "height, margin, padding";
	  target.style.transitionDuration = duration + "ms";
	  target.style.height = target.offsetHeight + "px";
	  target.offsetHeight;
	  target.style.overflow = "hidden";
	  target.style.height = 0;
	  target.style.paddingTop = 0;
	  target.style.paddingBottom = 0;
	  target.style.marginTop = 0;
	  target.style.marginBottom = 0;
	  window.setTimeout(() => {
		 target.hidden = true;
		 target.style.removeProperty("height");
		 target.style.removeProperty("padding-top");
		 target.style.removeProperty("padding-bottom");
		 target.style.removeProperty("margin-top");
		 target.style.removeProperty("margin-bottom");
		 target.style.removeProperty("overflow");
		 target.style.removeProperty("transition-duration");
		 target.style.removeProperty("transition-property");
		 target.classList.remove("_slide");
	  }, duration);
	}
};
let _slideDown = (target, duration = 500) => {
if (!target.classList.contains("_slide")) {
	target.classList.add("_slide");
	if (target.hidden) {
		target.hidden = false;
	}
	let height = target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = height + "px";
	target.style.removeProperty("padding-top");
	target.style.removeProperty("padding-bottom");
	target.style.removeProperty("margin-top");
	target.style.removeProperty("margin-bottom");
	window.setTimeout(() => {
		target.style.removeProperty("height");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
		target.classList.remove("_slide");
	}, duration);
}
};
let _slideToggle = (target, duration = 500) => {
if (target.hidden) {
	return _slideDown(target, duration);
} else {
	return _slideUp(target, duration);
}
};

// data-icon-class
// data-speed
// data-hide
// data-search
// data-placeholder

// data-sidebar
// multiple
// aria-labelledby
let durationSelect = 250;

(function selectsInit() {
	let selects = document.querySelectorAll("select[data-custom-select]");
	if (selects && selects.length > 0) {
		selects.forEach((select) => {
			selectItemInit(select)
		});
	}
})();

function selectItemInit(select){
	let oldSelect = select.parentElement.querySelector('.select__item');
	if(oldSelect){
		oldSelect.remove()
		select.parentElement.replaceWith(select)
	}
	select.style = "display: none";


	let selectedValueOriginal;
	select.hasAttribute('data-speed') ? durationSelect = select.dataset.speed : null;
	const selectModificatior = select.classList[0];
	const selectedOptions = select.querySelectorAll("option:checked");
	const options = Array.from(select.querySelectorAll("option"));
	const iconClass = select.hasAttribute('data-icon-class') ? select.dataset.iconClass: "icon-select-arrow";
	const hideClass = select.hasAttribute("data-hide") ? true : null;
	const dataPlaceholder = select.hasAttribute("data-placeholder") ? true : false;
	const selectedClass = select.dataset.iconSelectedClass ? select.dataset.iconSelectedClass : "selected";
	const customSidebar = select.hasAttribute('data-sidebar') ? true : false;
	const ariaLabelBy = select.hasAttribute('aria-labelledby') ? `aria-labelledby="${select.getAttribute('aria-labelledby')}"` : ''
	const selectBody = document.createElement("div");
	const multiple = select.multiple ? true : false;
	const isSearch = select.hasAttribute('data-search') ? true : false;
	const inputPlaceholder = select.dataset.search;
	selectBody.classList.add('select', `select_${selectModificatior}`);
	if(multiple){
		const selectMultipleSeparator = select.dataset.separator ? select.dataset.separator : ', '
		const emptyPlaceholder = select.dataset.emptyplaceholder
		const selectedValue = Array.from(selectedOptions);
		let valueState = selectedValue.map((value)=> value.textContent);
		if(valueState.length === 0){
			selectedValueOriginal = emptyPlaceholder ?  emptyPlaceholder : ''
		}else{
			selectedValueOriginal = valueState.join(selectMultipleSeparator);
		}
	}else{
		selectedValueOriginal = selectedOptions[0].innerText;
	}
	const selectItem = `
					<div class="select__item">
						<div class="select__title" tabindex="0">
							<div class="select__value ${iconClass}">
								<span>${selectedValueOriginal}</span>
							</div>
						</div>
						<div class="select__options" ${customSidebar ? 'data-simplebar' : ''} ${ariaLabelBy} hidden>
							${isSearch ? "<div class='select__option-search select-search'><input class='select-search__input' type='text' placeholder='" + inputPlaceholder + "'><button class='select-search__btn-clear' tabindex='0' type='button'></button></div>" : ''}
							${options.map((option, index) => {
									if (dataPlaceholder && index === 0) {
										return `<div class="select__option _placeholder">${option.textContent}</div>`;
									} else {
										return `<div ${hideClass && option.selected ? 'style="display:none"' : ""} tabindex='0' class="select__option${option.selected ? " " + selectedClass : ""}">${option.textContent}</div>`;
									}
								}).join("")
							}
						</div>								
					<div/>
		`;
	select.insertAdjacentElement("beforebegin", selectBody);
	selectBody.insertAdjacentHTML("afterbegin", selectItem);
	selectBody.insertAdjacentElement("afterbegin", select);
	if(isSearch){
		const newSelectOptions = selectBody.querySelectorAll('.select__option');
		const inputForSearch = selectBody.querySelector('.select-search__input');
		searchInSelect(inputForSearch, newSelectOptions);
	}
}
function openSelecOptions(target, focusOnElement){
	closeAllSelects();
	  const selectBody = target.closest(".select");
	  const originalSelect = selectBody.querySelector('select')
	  const selectOptions = selectBody.querySelector(".select__options");
	  if (!selectOptions.classList.contains("_slide")) {
		selectBody.classList.toggle("_active");
		selectOptions.classList.toggle("_open");
		if (selectOptions.classList.contains("_open")) {
		  _slideDown(selectOptions, durationSelect);
		} else {
		  _slideUp(selectOptions, durationSelect);
		}
	 }
}
function changeValueInSelect(target, shouldCloseOptions){
	const select = target.closest(".select").querySelector("select");
	const selectedClass = select.dataset.iconSelectedClass ? select.dataset.iconSelectedClass : "selected";
	const originalOption = target.closest(".select").querySelectorAll("option");
	const allCustomOptions = target.closest(".select__options").querySelectorAll(".select__option");
	const hideClass = select.hasAttribute("data-hide");
	const selectOptions = target.closest(".select__options");
	const selectBody = target.closest(".select");
	const selectValue = selectBody.querySelector(".select__value span");
	const targetInitialClass = target.classList.contains(selectedClass);
	target.classList.add(selectedClass);
	if (!selectOptions.classList.contains("_slide")) {
		const multiple = select.multiple ? true : false;
		if(multiple){
			target.classList.toggle(selectedClass, !targetInitialClass);
			const emptyPlaceholder = select.dataset.emptyplaceholder
			const selectMultipleSeparator = select.dataset.separator ? select.dataset.separator : ', '
			const selectedValue = Array.from(target.closest('.select__options').querySelectorAll(`.select__option.${selectedClass}`));
			let valueState = selectedValue.map((value)=> value.textContent);
			if(valueState.length === 0){
				selectValue.textContent = emptyPlaceholder
			}else{
				selectValue.textContent = valueState.join(selectMultipleSeparator);
			}
		}else{
			selectValue.textContent = target.textContent;
			allCustomOptions.forEach((option) => {
			option.classList.remove(selectedClass);
			hideClass ? option.removeAttribute("style") : null;
			});
			target.classList.add(selectedClass);
		}
		originalOption.forEach((option) => {
			if (option.textContent === target.textContent) {
				if(multiple){
					option.selected ? option.selected = false : option.selected =  true;
				}else{
					option.selected = true;
				}
			}
		});
		hideClass ? target.setAttribute("style", "display: none") : null;
		if(!multiple){
			shouldCloseOptions ? selectOptions.classList.remove("_open") : null;
			shouldCloseOptions ? selectBody.classList.remove("_active") : null;
			shouldCloseOptions ? _slideUp(selectOptions, durationSelect) : null;
		}
	}
}
function searchInSelect(searchInput, selectOptions){
	const btnClear = searchInput.nextElementSibling
	searchInput.addEventListener('input', (e)=>{
		if(e.target.value == ''){
			btnClear.classList.remove('show')
		}else{
			btnClear.classList.add('show')
		}
		const regexp = new RegExp(`${e.target.value}`, 'gi')
		const matchOptions = Array.from(selectOptions).filter((option)=>{
			return option.textContent.match(regexp)
		})
		selectOptions.forEach((optionInList)=>{
			if(matchOptions.find((option)=> option == optionInList)){
				optionInList.classList.remove('hide');
			}else{
				optionInList.classList.add('hide');
			}
		})
	})
	searchInput.nextElementSibling.addEventListener('click', (e)=>{
		searchInput.value = '';
		selectOptions.forEach((option)=> option.classList.remove('hide'))
		btnClear.classList.remove('show')
	})
}

function closeAllSelects() {
	const allSelectsOptionsOpen = document.querySelectorAll(".select__options._open");
	allSelectsOptionsOpen.forEach((options) => {
		if (!options.classList.contains("_slide")) {
			const select = options.closest(".select");
			select.classList.remove("_active");
			options.classList.remove("_open");
			_slideUp(options, durationSelect);
		}
});
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		closeAllSelects();
	}
});
window.addEventListener("click", (e) => {
	const target = e.target;
	//change the value in select
	if (target.closest(".select__option")) {
		changeValueInSelect(target, true)
	}
	//close all selects options
	if (!target.closest(".select")) {
		closeAllSelects();
	}
	//Open options
	if (target.closest(".select__title")) {
		openSelecOptions(target)
	}
});

// Function Update
function selectsUpdateAll() {
	let selects = document.querySelectorAll("select[data-custom-select]");
	if (selects) {
		selects.forEach((select)=> {
			selectItemInit(select);
		})
	}
}
function selectUpdateOneSelect(select){
	if(select){
		selectItemInit(select);
	}
}

//============================================================================
window.addEventListener('click', (e)=>{
	if(e.target.classList.contains('ones')){
		selectsUpdateAll()
		// let a = document.querySelector('select[data-custom-select]');
		// selectUpdateOneSelect(a)
	}
})
