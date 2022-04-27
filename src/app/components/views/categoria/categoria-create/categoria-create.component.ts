import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { Categoria } from "../categoria-read/categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-create",
  templateUrl: "./categoria-create.component.html",
  styleUrls: ["./categoria-create.component.css"],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: "",
    descricao: "",
  };

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.categoria).subscribe((resposta) => {
      this.router.navigate(["categorias"]);
      this.service.mensagem("Categoria criada com sucesso!");
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++){
        const errorMessage = err.error.errors[i].message;
        this.service.mensagem(errorMessage);
      }
    });
  }

  cancel(): void{
    this.router.navigate(['categorias'])
  }
}
