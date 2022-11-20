class keyboard {
	#swichEl;
	#fontSelectEl;
	#containerEl;
	#keyboardEl;
	#inputGroupEl;
	#inputEl;
	#keyPress = false;
	#mouseDown = false;
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
		document.addEventListener("keyup", this.#onKeyUp);
		this.#inputEl.addEventListener("input", this.#onInput);
		this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown);
		this.#keyboardEl.addEventListener("mouseup", this.#onMouseUp);
	}
	#onChangeTheme(e) {
		document.documentElement.setAttribute("theme", e.target.checked ? "dark-mode" : "");
	}
	#onChangeFont(e) {
		document.body.style.fontFamily = e.target.value;
	}
	#onKeyDown = e => {
		if (this.#mouseDown) return;
		this.#keyPress = true;
		if (e.isComposing || e.keyCode === 229 || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)) {
			//한글 입력
			this.#inputGroupEl.classList.add("error");
			return;
		} else {
			this.#inputGroupEl.classList.remove("error");
			this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.add("active");
		}
	};
	#onKeyUp = e => {
		if (this.#mouseDown) return;
		this.#keyPress = false;
		this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.remove("active");
	};
	#onInput = e => {
		if (e.isComposing || e.keyCode === 229 || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)) {
			e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
		}
	};
	#onMouseDown = e => {
		if (this.#keyPress) return;
		this.#mouseDown = true;
		e.target.closest("div.key")?.classList.add("active");
	};
	#onMouseUp = e => {
		if (this.#keyPress) return;
		this.#mouseDown = false;
		const keyEl = e.target.closest("div.key");
		const isActive = !!keyEl?.classList.contains("active");
		const val = keyEl?.dataset.val;
		this.#keyboardEl.querySelector(".active")?.classList.remove("active");
		if (isActive && !!val && val !== "Space" && val !== "Backspace") {
			this.#inputEl.value += val;
		}
		if (isActive && val === "Space") {
			this.#inputEl.value += " ";
		}
		if (isActive && val === "Backspace") {
			this.#inputEl.value = this.#inputEl.value.slice(0, -1);
		}
	};
}

new keyboard();
//한글 입력 방지
//https://minjung-jeon.github.io/IME-keyCode-229-issue/
//https://mytory.net/archives/238
