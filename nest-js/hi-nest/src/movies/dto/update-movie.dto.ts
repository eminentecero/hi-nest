import{IsString, IsNumber} from 'class-validator'
import{PartialType} from '@nestjs/mapped-types'
import { fromEventPattern } from 'rxjs'
import { CreateMovieDto } from './create-movie.dto'

export class UpdateMovieDto extends PartialType(CreateMovieDto){

}