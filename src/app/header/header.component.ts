import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DataStorageService } from '../shared/data/data-storage.service';
import { RecipeService } from '../recipes/service/recipe.service';
import { Subscription, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../shared/services/language.service';
import { AuthService } from '../auth/auth/service/auth.service';
import { ColorService } from '../shared/data/color.service';
const LANG_STORAGE_KEY = 'selectedLanguage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isAuthenticated = false;
  selectedLanguage: string = 'en';
  @ViewChild('paragraphElement') paragraphElement!: ElementRef;

  private userSub!: Subscription;
  bannerBackground: string = '';
  bannerText: string = '';
  isSpeaking: boolean = false;
  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService,
    private translate: TranslateService,
    private lang: LanguageService,
    private authService: AuthService,
    private colorService: ColorService
  ) {
    translate.setDefaultLang('en');
  }

  ngAfterViewInit(): void {
    // const paragraphText = this.paragraphElement.nativeElement.textContetn;
    // console.log(paragraphText);
  }

  // toggleSpeak() {
  //   const synth = window.speechSynthesis;
  //   console.log(this.isSpeaking);

  //   // Jeśli obecnie trwa odtwarzanie, zatrzymaj
  //   if (this.isSpeaking) {
  //     synth.cancel();
  //     this.isSpeaking = false;
  //     return;
  //   }
  //   this.isSpeaking = true;

  //   const paragraphs =
  //     this.paragraphElement.nativeElement.querySelectorAll('p, h1, a');
  //   let currentParagraphIndex = 0;

  //   const voicesChangedHandler = () => {
  //     const voices = synth.getVoices();
  //     if (voices.length === 0) {
  //       return;
  //     }

  //     const playCurrentParagraph = () => {
  //       const utterance = new SpeechSynthesisUtterance(
  //         paragraphs[currentParagraphIndex].textContent || ''
  //       );

  //       const googleVoice = voices.find(
  //         (voice) => voice.name === 'Google polski'
  //       );

  //       if (googleVoice) {
  //         utterance.voice = googleVoice;
  //       }

  //       utterance.onend = () => {
  //         currentParagraphIndex++;
  //         if (currentParagraphIndex < paragraphs.length) {
  //           setTimeout(() => {
  //             playCurrentParagraph();
  //           }, 1000);
  //         } else {
  //           // Po zakończeniu odtwarzania ustaw flagę isSpeaking na false
  //           this.isSpeaking = false;
  //         }
  //       };

  //       // Odtwórz tekst z ustawionym głosem
  //       synth.speak(utterance);
  //     };

  //     // Odtwórz pierwszy paragraf
  //     playCurrentParagraph();

  //     // Usuń zdarzenie po jego obsłużeniu, aby uniknąć potencjalnych problemów
  //     synth.removeEventListener('voiceschanged', voicesChangedHandler);
  //   };

  //   // Dodaj obsługę zdarzenia voiceschanged
  //   synth.addEventListener('voiceschanged', voicesChangedHandler);

  //   const voices = synth.getVoices();

  //   if (voices.length > 0) {
  //     // Przed rozpoczęciem odtwarzania ustaw flagę isSpeaking na true
  //     this.isSpeaking = true;
  //     voicesChangedHandler();
  //   }
  // }
  speak() {
    const synth = window.speechSynthesis;
    const childElements = this.paragraphElement.nativeElement.children;
    console.log(childElements);

    // Filtruj tylko elementy, które zawierają tekst
    const elementsArray = Array.from(childElements);
    const textElements: HTMLElement[] = elementsArray.filter(
      (element): element is HTMLElement => {
        return (
          element instanceof HTMLElement &&
          element.textContent !== null &&
          element.textContent.trim() !== ''
        );
      }
    );

    // Jeśli obecnie trwa odtwarzanie, zatrzymaj
    if (this.isSpeaking) {
      synth.cancel();
      this.isSpeaking = false;
      return;
    }

    this.isSpeaking = true;

    // Indeks aktualnie odtwarzanego elementu
    let currentElementIndex: number = 0;

    // Funkcja obsługi zdarzenia voiceschanged
    const voicesChangedHandler = () => {
      // Sprawdź, czy wszystkie głosy są już dostępne
      const voices = synth.getVoices();
      if (voices.length === 0) {
        return;
      }

      // Funkcja odtwarzająca aktualny element
      const playCurrentElement = () => {
        const utterance = new SpeechSynthesisUtterance(
          textElements[currentElementIndex].textContent || ''
        );

        // Znajdź głos o nazwie "Google polski", jeśli dostępny
        const googleVoice = voices.find(
          (voice) => voice.name === 'Google polski'
        );

        if (googleVoice) {
          console.log(googleVoice);
          utterance.voice = googleVoice;
        }

        // Dodaj przerwę po zakończeniu odtwarzania elementu
        utterance.onend = () => {
          // Zwiększ indeks i odtwórz następny element po zakończeniu przerwy
          currentElementIndex++;
          if (currentElementIndex < textElements.length) {
            setTimeout(() => {
              playCurrentElement();
              this.isSpeaking = true;
            }, 1000); // 1 sekunda przerwy
          }
        };

        // Odtwórz tekst z ustawionym głosem
        synth.speak(utterance);
      };

      // Odtwórz pierwszy element
      playCurrentElement();

      // Usuń zdarzenie po jego obsłużeniu, aby uniknąć potencjalnych problemów
      synth.removeEventListener('voiceschanged', voicesChangedHandler);
    };

    // Dodaj obsługę zdarzenia voiceschanged
    synth.addEventListener('voiceschanged', voicesChangedHandler);

    // Sprawdź, czy głosy są już dostępne
    const voices = synth.getVoices();

    // Jeśli głosy są dostępne, wykonaj obsługę zdarzenia 'voiceschanged'
    if (voices.length > 0) {
      voicesChangedHandler();
    }
  }

  // poprawne na dole

  // speak() {
  //   const synth = window.speechSynthesis;
  //   const paragraphs =
  //     this.paragraphElement.nativeElement.querySelectorAll('p, h1, a');
  //   // Jeśli obecnie trwa odtwarzanie, zatrzymaj
  //   if (this.isSpeaking) {
  //     synth.cancel();
  //     this.isSpeaking = false;
  //     return;
  //   }
  //   this.isSpeaking = true;

  //   // Indeks aktualnie odtwarzanego paragrafu
  //   let currentParagraphIndex = 0;

  //   // Funkcja obsługi zdarzenia voiceschanged
  //   const voicesChangedHandler = () => {
  //     // Sprawdź, czy wszystkie głosy są już dostępne
  //     const voices = synth.getVoices();
  //     if (voices.length === 0) {
  //       return;
  //     }

  //     // Funkcja odtwarzająca aktualny paragraf
  //     const playCurrentParagraph = () => {
  //       const utterance = new SpeechSynthesisUtterance(
  //         paragraphs[currentParagraphIndex].textContent || ''
  //       );

  //       // Znajdź głos o nazwie "Google polski", jeśli dostępny
  //       const googleVoice = voices.find(
  //         (voice) => voice.name === 'Google polski'
  //       );

  //       if (googleVoice) {
  //         console.log(googleVoice);
  //         utterance.voice = googleVoice;
  //       }

  //       // Dodaj przerwę po zakończeniu odtwarzania paragrafu
  //       utterance.onend = () => {
  //         // Zwiększ indeks i odtwórz następny paragraf po zakończeniu przerwy
  //         currentParagraphIndex++;
  //         if (currentParagraphIndex < paragraphs.length) {
  //           setTimeout(() => {
  //             playCurrentParagraph();
  //             this.isSpeaking = true;
  //           }, 1000); // 1 sekunda przerwy
  //         }
  //       };

  //       // Odtwórz tekst z ustawionym głosem
  //       synth.speak(utterance);
  //     };

  //     // Odtwórz pierwszy paragraf
  //     playCurrentParagraph();

  //     // Usuń zdarzenie po jego obsłużeniu, aby uniknąć potencjalnych problemów
  //     synth.removeEventListener('voiceschanged', voicesChangedHandler);
  //   };

  //   // Dodaj obsługę zdarzenia voiceschanged
  //   synth.addEventListener('voiceschanged', voicesChangedHandler);

  //   // Sprawdź, czy głosy są już dostępne
  //   const voices = synth.getVoices();

  //   // Jeśli głosy są dostępne, wykonaj obsługę zdarzenia 'voiceschanged'
  //   if (voices.length > 0) {
  //     voicesChangedHandler();
  //   }
  // }

  // speak() {
  //   const synth = window.speechSynthesis;
  //   const utterance = new SpeechSynthesisUtterance(
  //     this.paragraphElement.nativeElement.textContent
  //   );
  //   synth.speak(utterance);
  // }

  // speak() {
  //   const synth = window.speechSynthesis;
  //   const utterance = new SpeechSynthesisUtterance(
  //     this.paragraphElement.nativeElement.textContent
  //   );
  //   let voices = window.speechSynthesis.getVoices();
  //   console.log(voices);
  //   utterance.voice = voices.filter(function (voice) {
  //     return voice.name == 'Google polski';
  //   })[0];

  //   synth.speak(utterance);
  // }

  ngOnInit(): void {
    // Sprawdź, czy wybrany język jest zapisany w localStorage

    this.colorService.getColors().subscribe((color) => {
      this.bannerBackground = color.bannerBackground;
      this.bannerText = color.bannerText;
    });

    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
    const storedLanguage = localStorage.getItem(LANG_STORAGE_KEY);
    if (storedLanguage) {
      this.selectedLanguage = storedLanguage;
      this.lang.switchLanguage(this.selectedLanguage);
    }
  }
  switchLanguage() {
    this.lang.switchLanguage(this.selectedLanguage);
    localStorage.setItem(LANG_STORAGE_KEY, this.selectedLanguage);
  }
  //
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  isDropdownOpen = false;
  isFetchDataOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleFetchData() {
    this.isFetchDataOpen = !this.isFetchDataOpen;
  }

  onSaveData() {
    this.dataService.storeRecipes();
  }
  onFetchData() {
    console.log('fetch data');
    this.dataService.fetchRecipes().subscribe();
  }
}
