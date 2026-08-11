import { ReactNode } from 'react';
import Link from 'next/link';
import {
  BEGINNER_TUTORIAL_URL,
  COMPETITOR_GUIDE_VIDEO_URL,
  DISCORD_URL,
  FACEBOOK_URL,
  WCA_LIVE_URL,
  WCA_RESULTS_URL,
  WCA_SIGNUP_URL,
} from '../../utils/constants';

export interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqSection {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    items: [
      {
        id: 'how-can-i-learn-to-solve-the-cube',
        question: 'How can I learn to solve the cube?',
        answer: (
          <p>
            Check out this
            {' '}
            <Link href={BEGINNER_TUTORIAL_URL}>beginner&apos;s PDF tutorial here</Link>
            . There are also many more resources on the internet to help you
            learn how to solve the cube faster.
          </p>
        ),
      },
      {
        id: 'how-old-do-i-have-to-be-to-compete',
        question: 'How old do I have to be to compete?',
        answer: (
          <p>
            Anyone can compete at any age! Competitors range in age from 4-84
            years, however most competitors are aged 10-20 years old. If you
            are considering coming to a competition – JUST DO IT! Competitions
            are a great experience regardless of age.
          </p>
        ),
      },
      {
        id: 'how-fast-do-i-have-to-be-to-compete',
        question: 'How fast do I have to be to compete?',
        answer: (
          <p>
            To compete you only need to know how to solve the cube! Most
            competitions have a 5 minute time limit for the 3x3x3 cube event.
            Each competition lists the time limits and cut-offs for each
            event. So if you can solve the puzzle in that time YOU CAN
            COMPETE!
          </p>
        ),
      },
    ],
  },
  {
    id: 'registering-and-events',
    title: 'Registering and events',
    items: [
      {
        id: 'how-do-i-register-for-a-competition',
        question: 'How do I register for a competition?',
        answer: (
          <p>
            First, you need to make sure you have created a WCA account. You
            can do this by going to the
            {' '}
            <Link href={WCA_SIGNUP_URL}>sign-up page</Link>
            {' '}
            and creating an account. Once you have created the account and
            confirmed your email address, go to the Register page of the
            competition and follow the instructions carefully.
            {' '}
            <strong>
              You will not be added to the competitor list until you have
              paid so make sure to do so!
            </strong>
            {' '}
            Registrations usually fill very quickly, so make sure to register
            early. If a competition has filled up we will add your name to
            the waiting list.
          </p>
        ),
      },
      {
        id: 'what-events-can-i-compete-in',
        question: 'What events can I compete in?',
        answer: (
          <p>
            There are currently 17 official WCA events. Not every competition
            will have every event, so make sure to look at the event tab to
            see what events are being held at your competition. Events will
            often have time limits. If you think you can solve in less than
            that time then you can compete.
          </p>
        ),
      },
      {
        id: 'are-there-different-age-or-ability-categories',
        question: 'Are there different age or ability categories?',
        answer: (
          <p>
            All competitors compete on the same level and all ages are
            welcome. WCA competitions are incredibly supportive environments
            and there is always a range of ages and abilities.
          </p>
        ),
      },
    ],
  },
  {
    id: 'at-the-competition',
    title: 'At the competition',
    items: [
      {
        id: 'am-i-allowed-to-bring-any-guests',
        question: 'Am I allowed to bring any guests?',
        answer: (
          <p>
            Yes! We allow as many guests as you&apos;d like at nearly all of
            our local competitions, but double check the guests policy on the
            WCA page of the competition before you go. Remember all
            competitors under-16 need to be accompanied by an adult.
          </p>
        ),
      },
      {
        id: 'i-am-not-quite-ready-to-compete-can-i-come-watch',
        question: 'I am not quite ready to compete, can I come watch?',
        answer: (
          <p>
            Yes! We encourage and welcome spectators. It is often a good idea
            to come to a competition to see what it is all about. There&apos;s
            no need to book - you can just show up on the day and spend as
            long as you&apos;d like with us! We have a very friendly and
            welcoming community and we&apos;re sure you&apos;ll feel right at
            home. You are also welcome to have a go on our competition timers
            during lunchtimes.
          </p>
        ),
      },
      {
        id: 'what-do-i-need-to-know-before-the-competition-day',
        question: 'What do I need to know before the competition day?',
        answer: (
          <p>
            The delegates will tell you all you need to know at the
            competition. Watch
            {' '}
            <Link href={COMPETITOR_GUIDE_VIDEO_URL}>this video</Link>
            {' '}
            to see what to expect at a competition.
          </p>
        ),
      },
      {
        id: 'what-do-i-need-to-bring-to-my-first-competition',
        question: 'What do I need to bring to my first competition?',
        answer: (
          <p>
            Make sure to bring some sort of ID so we can confirm your date of
            birth and nationality (i.e a passport). If you do not have
            suitable ID don&apos;t worry you can still compete, we will just
            double-check your nationality and date of birth on the day. Make
            sure to also bring your own puzzles for all events you are
            competing in. There are 1000s of puzzles at these events so make
            sure you keep yours with you at all times.
          </p>
        ),
      },
      {
        id: 'can-i-help-out-at-a-competition',
        question: 'Can I help out at a competition?',
        answer: (
          <p>
            Of course! Throughout the day we will need judges and runners so
            please see our delegates and organisers to ask how you can best
            assist.
          </p>
        ),
      },
    ],
  },
  {
    id: 'results-and-community',
    title: 'Results and community',
    items: [
      {
        id: 'where-do-i-find-my-wca-id',
        question: 'Where do I find my WCA ID?',
        answer: (
          <p>
            After your first competition you will receive a WCA ID, that will
            be the year you first competed, the first 4 letters of your
            surname and a numeric identifier eg 2012BEAH01. For your first
            competition you only need a WCA account not a WCA ID.
          </p>
        ),
      },
      {
        id: 'where-do-i-find-my-results',
        question: 'Where do I find my results?',
        answer: (
          <p>
            Competitor times will be uploaded throughout the competition onto
            {' '}
            <Link href={WCA_LIVE_URL}>WCA Live</Link>
            . Please allow up to an hour from finishing your solves to them
            being uploaded. After the competition has finished and all
            results are verified, they are added to the
            {' '}
            <Link href={WCA_RESULTS_URL}>WCA results</Link>
            {' '}
            database.
          </p>
        ),
      },
      {
        id: 'are-there-any-clubs-or-local-meetups-i-can-go-to',
        question: 'Are there any clubs or local meetups I can go to?',
        answer: (
          <p>
            Speedcubing Ireland is not affiliated with any clubs, however
            there are often meetups organised by individuals within the
            community. If you are interested in connecting with local
            cubers, we highly recommend joining the
            {' '}
            <Link href={FACEBOOK_URL}>Speedcubing Ireland Community Facebook Group</Link>
            {' '}
            or the
            {' '}
            <Link href={DISCORD_URL}>Speedcubing Ireland Discord server</Link>
            .
          </p>
        ),
      },
    ],
  },
];
