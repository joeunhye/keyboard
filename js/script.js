class keyboard {
	#swichEl;
	#fontSelectEl;
	#containerEl;
	#keyboardEl;
	#inputGroupEl;
	#inputEl;
	constructor() {
		this.#assignElement();
		this.#addEvent();
	}
	#assignElement() {
		this.#containerEl = document.getElementById("container");
		this.#swichEl = this.#containerEl.querySelector("#switch");
		this.#fontSelectEl = this.#containerEl.querySelector("#font");
		this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
		this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
		this.#inputEl = this.#inputGroupEl.querySelector("#input");
	}
	#addEvent() {
		this.#swichEl.addEventListener("change", this.#onChangeTheme);
		this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
		document.addEventListener("keydown", this.#onKeyDown);
		this.#inputEl.addEventListener("input", this.#onInput);
	}
	#onChangeTheme(e) {
		document.documentElement.setAttribute("theme", e.target.checked ? "dark-mode" : "");
	}
	#onChangeFont(e) {
		document.body.style.fontFamily = e.target.value;
	}
	#onKeyDown = e => {
		if (e.isComposing || e.keyCode === 229 || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)) {
			//한글 입력
			this.#inputGroupEl.classList.add("error");
			return;
		} else {
			this.#inputGroupEl.classList.remove("error");
			this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.add("active");
		}
	};
	#onInput = e => {
		if (e.isComposing || e.keyCode === 229 || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)) {
			e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
		}
	};
}

new keyboard();
//한글 입력 방지
//https://minjung-jeon.github.io/IME-keyCode-229-issue/
//https://mytory.net/archives/238
