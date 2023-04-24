import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }

  @Patch()
  async update(
    @Query('email') email: string,
    @Query('instagram') instagram: string,
    @Query('mobileNumber') phone: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactService.update(
      email,
      instagram,
      phone,
      updateContactDto,
    );
  }

  @Get('fetch')
  async findByContact(
    @Query('email') email: string,
    @Query('instagram') instagram: string,
    @Query('mobileNumber') phone: string,
  ) {
    return await this.contactService.findByContact(email, instagram, phone);
  }

  @Get()
  async findByCompany(@Query('company') company: string) {
    return await this.contactService.findByCompany(company);
  }
}
