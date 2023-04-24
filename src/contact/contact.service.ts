import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    let contact: Contact;
    if (
      (!createContactDto.email || createContactDto.email === '') &&
      (!createContactDto.mobileNumber ||
        createContactDto.mobileNumber === '') &&
      (!createContactDto.instagram || createContactDto.instagram === '')
    ) {
      console.error(
        'At least one of email, phoneNumber or instagram is required',
      );
      throw new BadRequestException(
        'At least one of email, phoneNumber or instagram is required',
      );
    }

    // Check if social details available
    if (createContactDto.email) {
      contact = await this.contactsRepository.findOne({
        where: { email: createContactDto.email },
      });
    } else if (createContactDto.instagram) {
      contact = await this.contactsRepository.findOne({
        where: { instagram: createContactDto.instagram },
      });
    } else if (createContactDto.mobileNumber) {
      contact = await this.contactsRepository.findOne({
        where: { mobileNumber: createContactDto.mobileNumber },
      });
    }

    if (
      contact &&
      contact.companyName === createContactDto.companyName.toUpperCase()
    ) {
      console.error('Contact already exists');
      throw new BadRequestException('Contact already exists');
    }

    if (createContactDto.companyName === '') {
      console.error('Company name is required');
      throw new BadRequestException('Company name is required');
    }
    // Create new contact if it doesn't exist
    const newContact = new Contact();
    newContact.address = createContactDto.address;
    newContact.email = createContactDto.email;
    newContact.instagram = createContactDto.instagram;
    newContact.mobileNumber = createContactDto.mobileNumber;
    newContact.name = createContactDto.name;
    newContact.companyName = createContactDto.companyName.toUpperCase();
    await newContact.save();

    return {
      statusCode: 201,
      message: 'Contact created successfully',
      data: newContact,
    };
  }

  async update(
    email: string,
    instagram: string,
    phone: string,
    updateContactDto: UpdateContactDto,
  ) {
    let contact: Contact;
    // Check if social details available
    if (email) {
      contact = await this.contactsRepository.findOne({
        where: { email: email },
      });
    } else if (instagram) {
      contact = await this.contactsRepository.findOne({
        where: { instagram: instagram },
      });
    } else if (phone) {
      contact = await this.contactsRepository.findOne({
        where: { mobileNumber: phone },
      });
    }
    if (!contact) {
      console.error('Contact not found');
      throw new BadRequestException('Contact does not exist');
    }
    await this.contactsRepository.update(contact.id, updateContactDto);
    const updatedContact = await this.contactsRepository.findOne({
      where: { id: contact.id },
    });
    return {
      statusCode: 200,
      message: 'Contact updated successfully',
      data: updatedContact,
    };
  }

  async findByContact(email: string, instagram: string, phone: string) {
    let contact: Contact;
    // Check if social details available
    if (email) {
      contact = await this.contactsRepository.findOne({
        where: { email: email },
      });
    } else if (instagram) {
      contact = await this.contactsRepository.findOne({
        where: { instagram: instagram },
      });
    } else if (phone) {
      contact = await this.contactsRepository.findOne({
        where: { mobileNumber: phone },
      });
    }
    if (!contact) {
      console.error('Contact not found');
      throw new BadRequestException('Contact does not exist');
    }

    return {
      statusCode: 200,
      message: 'Contact fetched successfully',
      data: {
        name: contact.name,
        email: contact.email,
        mobileNumber: contact.mobileNumber,
        instagram: contact.instagram,
        address: contact.address,
      },
    };
  }

  async findByCompany(company: string) {
    const contacts = await this.contactsRepository.find({
      where: { companyName: company.toUpperCase() },
    });
    return {
      statusCode: 200,
      message: 'Contact fetched successfully',
      data: contacts,
    };
  }

  async findByMobileNumber(mobileNumber: string): Promise<Contact> {
    return this.contactsRepository.findOne({ where: { mobileNumber } });
  }

  async findByInstagram(instagram: string): Promise<Contact> {
    return this.contactsRepository.findOne({ where: { instagram } });
  }
}
