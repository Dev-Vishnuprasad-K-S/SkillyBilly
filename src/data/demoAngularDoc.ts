export const angularStudyMaterial: string = `Day 1: Deep Dive into Dependency Injection (DI)
●	Hour 1 (Theory):
○	Key Concepts from Official Docs:
■	Dependency Injection (DI) is a design pattern where a class requests dependencies from external sources rather than creating them itself.
■	Injector: The main mechanism in Angular's DI framework. It maintains a container of service instances and creates new ones when needed. Angular creates an application-wide "root" injector and other injectors as needed.
■	Provider: An instruction to the DI system on how to obtain a value for a dependency. Most often, this is a service class.
■	Dependency: The object (like a service or value) that a class needs to perform its function.
○	Providing Dependencies:
■	@Injectable() decorator: Marks a class as one that can be provided and injected. It's best practice to add it to every service class.
■	providedIn: 'root': The most common way to provide a service. You add this to the @Injectable() decorator. It registers the service with the root injector, making a single, shared instance of the service available throughout the application. This is also tree-shakable, meaning if the service isn't used, it's removed from the final bundle.
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService { }

■	Component-level Providers: You can provide a service at a component level using the providers array in the @Component decorator. This creates a new instance of the service for each new instance of that component.
import { HeroService } from './hero.service';

@Component({
  selector:    'app-heroes',
  templateUrl: './heroes.component.html',
  providers:  [ HeroService ]
})
export class HeroesComponent { }

○	Injecting Dependencies:
■	The most common way is to request the dependency in a class's constructor.
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({ /* ... */ })
export class UserComponent {
  constructor(private userService: UserService) { }
}

●	Hour 1.5 (Practical):
○	Follow the examples in the official documentation to create services and inject them into components.
○	Experiment with different provider scopes (root, component-level). Create a service provided in root and another provided in a component. Observe how many instances are created.
●	Hour 0.5 (Review):
○	Summarize the roles of @Injectable, providers, and the injector.
○	Write a small application that demonstrates hierarchical dependency injection (e.g., a parent and child component each getting an instance of a service provided at their respective levels).
`